import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';
// components
import Iconify from '../../components/Iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Dialog from '../../utils/dialog'



// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbar({ onOpenSidebar,check }) {
  const [passwordChecker,setpasswordChecker] = useState(false)
  const [notification,setnotification] = useState(false)
  const [dialogopen,setdialogopen] = useState(false);
  
  
  useEffect(()=>{

     if(typeof check !== "undefined"){
     
       setpasswordChecker(check)
     }

    setpasswordChecker(reactLocalStorage.getObject('admin').changepassword)
   
  },[])

  useEffect(()=>{
    if(reactLocalStorage.getObject('admin').roleid === 1){
      NotificationCount();
      const interval =  setInterval(()=>{
           NotificationCount();
       },10000);

       return ()=>clearInterval(interval);
    }
  

    

},[])

const NotificationCount = async ()=>{
 
  await axios({
      method: "GET",
      url: `https://jupit.app/admin/admit/staff`,
      headers:{
          'Content-Type':'application/json',
          
          'Authorization':reactLocalStorage.get('token')
      },

  })
  .then((res)=>{
      
      setnotification(res.data)
      if(res.data.length > 0){
        setdialogopen(true)
      }
      console.log(res.data.length)
      
  })
  .catch((err)=>{
      console.log(err.response);

      setnotification('Error');
      if(err.response){
          if(err.response.status === 403){
              reactLocalStorage.clear();
              window.location='/login'
          }
      }
    
      
      
  })
}



  return (
    <RootStyle>
      {dialogopen && <Dialog open={dialogopen} close={setdialogopen} data={notification}/>}
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} className={passwordChecker ? 'show':'hide'}>
          {/* <LanguagePopover /> */}
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

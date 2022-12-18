import { useRef, useState } from 'react';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import swal from 'sweetalert';
// component
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import EditStaffRole from '../../../utils/modal/editStaffRole';
import Iconify from '../../../components/Iconify';
import EditModal from '../../../utils/modal/editmodal'



// ----------------------------------------------------------------------

export default function StaffMore({userid,update,status,loader,staffusername,rolename}) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [stateModal,setStateModal] = useState(false)
  const [Loader,setLoader] = useState(false)
   
  const _handleDeactivate = async ()=>{
      let statusUpdate = "";
      switch(status){
          case 'active':
              statusUpdate="non-active";
              break;
          case  'non-active':
              statusUpdate = "active";
              break;
          default:
      }
      
        loader(true)
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/activate/deactivate/staff`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        data:JSON.stringify({userid,statusUpdate})
      })
      .then((res)=>{
       console.log(res.data)
       loader(false)
       update(true);
       
       
  
      })
      .catch((err)=>{
            loader(false)
            alert(err.response.data)
            console.log(err.response)
      })
  }
  const handleDelete = async ()=>{

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

      
      setLoader(true)
      const BaseUrl = process.env.REACT_APP_ADMIN_URL  
     axios({
    
        url:`${BaseUrl}/admin/delete/staff`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        data:JSON.stringify({userid})
      })
      .then((res)=>{
       console.log(res.data)
       setLoader(false);
       update(true);
         swal("Staff Profile Deleted", {
          icon: "success",
        });
       
  
      })
      .catch((err)=>{
            setLoader(false);
            alert(err.response.data)
            console.log(err.response)
      })
      } 
    });

  }

  const handleRoleEdit = ()=>{
    setStateModal(true)
  }




  return (
    <>
        {stateModal && <EditStaffRole statemodal modifyOpen={setStateModal} userid={userid}  loader={loader} update={update} staffusername={staffusername} rolename={rolename}/>}
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="material-symbols:domain-verification-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary={status === "active"? 'Deactivate Profile': 'Activate Profile'} primaryTypographyProps={{ variant: 'body2' }} onClick={()=>_handleDeactivate()} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete Profile" primaryTypographyProps={{ variant: 'body2' }}  onClick={()=>handleDelete()} />
        </MenuItem>

        <MenuItem  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Staff Role/Priviledge" primaryTypographyProps={{ variant: 'body2' }}  onClick={()=>handleRoleEdit()} />
        </MenuItem>
      </Menu>
    </>
  );
}

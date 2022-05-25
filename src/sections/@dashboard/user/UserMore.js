import { useRef, useState } from 'react';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import EditModal from '../../../utils/modal/editmodal'
// ----------------------------------------------------------------------

export default function UserMore({userid,_id}) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [stateModal,setStateModal] = useState(false)

   const _handleUserProfile = ()=>{
   
     
     window.location=`/dashboard/user/${userid}`
  }
  const _handleUserVerification = ()=>{
    window.location=`/dashboard/user/idcard/verification/${_id}`
  }
  return (
    <>
        {stateModal && <EditModal statemodal modifyOpen={setStateModal}/>}
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
          <ListItemText primary="Verification" primaryTypographyProps={{ variant: 'body2' }} onClick={()=>_handleUserVerification()} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View More" primaryTypographyProps={{ variant: 'body2' }}  onClick={()=>_handleUserProfile()} />
        </MenuItem>
      </Menu>
    </>
  );
}
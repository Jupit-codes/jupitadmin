import { useRef, useState } from 'react';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
// import EditModal from '../../../utils/modal/editmodal'
import EditModal from '../../../utils/modal/editRole'
// ----------------------------------------------------------------------

export default function EditRoleMenu({rowId,roleName,setRefresh, refresh}) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [stateModal,setStateModal] = useState(false)
    const _handleUserProfile = ()=>{
        setStateModal(true)
    }
  
  return (
    <>
        {stateModal && <EditModal statemodal modifyOpen={setStateModal} rolename={roleName} rowid={rowId}  refresh={refresh} reloadData={setRefresh}/>}
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
        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}

        <MenuItem onClick={()=>setStateModal(true)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit Role" primaryTypographyProps={{ variant: 'body2' }}   />
        </MenuItem>
      </Menu>
    </>
  );
}

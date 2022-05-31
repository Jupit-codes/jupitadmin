import { useRef, useState } from 'react';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import { reactLocalStorage } from 'reactjs-localstorage';
import Iconify from '../../../components/Iconify';
import EditModal from '../../../utils/modal/editmodal'

// ----------------------------------------------------------------------

export default function GiftCardMore({userid,unique_id,data}) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [stateModal,setStateModal] = useState(false)

   
  const _handleGiftcardUploads = ()=>{
  
    window.location=`/dashboard/giftcard/sell/cardupload/${unique_id}`
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
          <ListItemText primary="Details" primaryTypographyProps={{ variant: 'body2' }} onClick={()=>_handleGiftcardUploads()} />
        </MenuItem>

       
      </Menu>
    </>
  );
}

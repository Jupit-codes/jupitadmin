import * as React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import { setNestedObjectValues } from 'formik';
import Iconify from '../../components/Iconify'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function AuthWait({close,open}) {

const handleClose = ()=>{
    close(!open);
}

const statemodal= ()=>{

}
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
            Please Wait while A Superior authorise your signin process.
          </Typography>
        
        </Box>
      </Modal>
    </div>
  );
}

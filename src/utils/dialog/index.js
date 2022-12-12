import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import Swal from 'sweetalert2';



export default function AlertDialogSlide({open,close,data}) {

const showMessage = ()=>{
  return <>
            <span style={{fontWeight:"bold"}}>{data[0].username}</span> is attempting to Login to jupit app.
          </>
}
  

  const handleClose = () => {
    close(!open)
  };

  const handleUpdate = async (status)=>{
    
      await axios({
        method: "POST",
        url: `https://jupit.app/admin/handle/staff/login`,
        headers:{
            'Content-Type':'application/json',
            
            'Authorization':reactLocalStorage.get('token')
        },
        data:JSON.stringify({status,id:data[0]._id})

    })
    .then((res)=>{
        
      handleClose();
        
        
    })
    .catch((err)=>{
        
        if(err.response){
            if(err.response.status === 403){
                reactLocalStorage.clear();
                window.location='/login'
            }
          console.log(err.response)
            Swal.fire({
              title: 'Message!',
              text: err.response.data.message,
              icon: 'error',
              confirmButtonText: 'ok'
            });

            handleClose()
        }
        
      
        
        
    })
  }

  return (
    <div>
     
      <Dialog
        open={open}
        
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Authorise User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {showMessage()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleUpdate('disapproved')}>Disagree</Button>
          <Button onClick={()=>handleUpdate('approved')}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

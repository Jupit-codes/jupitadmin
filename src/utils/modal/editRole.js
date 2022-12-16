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



export default function EditRole({rowid,rolename,modifyOpen,statemodal,reloadData,refresh}) {
  const [open, setOpen] = React.useState(false);
  const [disablebtn,setdisablebtn] = React.useState(false)
  const [newRolename, setnewRoleName] = React.useState('');
 
  React.useEffect(()=>{
        setTimeout(()=>{
            setnewRoleName(rolename)
        },100)

  },[])
 
  const handleClose = () => modifyOpen(!statemodal);

    const handeChangeN = (e)=>{
        setnewRoleName(e.target.value)
    }
 
  const handleRoleEdit = async ()=>{
    const BaseUrl = process.env.REACT_APP_ADMIN_URL
   setdisablebtn(true)
    await axios({
      url:`${BaseUrl}/admin/edit/rolename`,
      method:"POST",
      headers:{
        "Content-type":'application/json',
        "Authorization":reactLocalStorage.get('token')
      },
      data:JSON.stringify({rowid,newrolename:newRolename})

    })
    .then((res)=>{
     
      if(res.data.status){
        setdisablebtn(false);
        Swal.fire({
          title: 'Message!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        
        reloadData(!refresh)
        modifyOpen(!statemodal)
        
      }

    })
    .catch((err)=>{
      console.log("errorx",err.response);
    })
  }

 
  
  return (
    <div>
      <Modal
        open={statemodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
           Edit Role
          </Typography>
         
                    

                    <TextField
                    required
                    id="outlined-required"
                    label="Role Name"
                    value={newRolename|| ''}
                    style={{marginTop:20}}
                    onChange={handeChangeN}
                    type="text"
                  />  

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              
            <Button variant="outlined" disableElevation style={{marginTop:10}} disabled={disablebtn} onClick={()=>handleRoleEdit()}>Submit</Button>
        </Typography>
        </Box>
      </Modal>
    </div>
  );
}

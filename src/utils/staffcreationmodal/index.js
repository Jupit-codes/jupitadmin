import * as React from 'react';
import { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import Swal from 'sweetalert2';



import { setNestedObjectValues } from 'formik';

import {InputLabel,MenuItem, Box, Modal,Select, Stack,TextField,Button,Typography, Grid, Container, CardContent,Card, CardHeader,IconButton, InputAdornment } from '@mui/material';

import Iconify from '../../components/Iconify'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:'100%',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius:1,
  
  p: 4,
};



const Index = ({closeModal,modify}) =>{
  const [statemodal,setstatemodal] = useState(true);
//   const [handleClose,sethandleClose] = useState(false);
const [username,setusername] = useState('');
const [fname,setfname] = useState('');
const [lname,setlname] = useState('');
const [email,setemail] = useState('');
const [role,setrole] = useState('');
const [btn,setbtn] = useState('Create Staff');
const [disablebtn,setdisablebtn] = useState(false)
 

  const handleUsername = (e) => {
    setusername(e.target.value)
  }
  const handleFirstname = (e) => {
    setfname(e.target.value)
  }
  const handleLastname = (e) => {
    setlname(e.target.value)
  }
  const handleEmail = (e) => {
    setemail(e.target.value)
  }

  const handleRole= (e) =>{
      
      setrole(e.target.value)
    
  }

  const CreateStaff = async ()=>{

    

      if(username === ""){
        alert('Username is Required');
        return false;
    }

      if(fname === ""){
          alert('Firstname is Required');
          return false;
      }
      if(lname === ""){
        alert('Lastname is Required');
        return false;
      }
      if(email === ""){
        alert('Email is Required');
        return false;
      }
      if(role === ""){
        alert('Staff Role is Required');
        return false;
      }

      setbtn('Please wait...');
      setdisablebtn(true)
      const BaseUrl = process.env.REACT_APP_ADMIN_URL  
      await axios({
      
          url:`${BaseUrl}/admin/staff/creation`,
          method:'POST',
          headers:{
            'Content-Type':'application/json',  
            'Authorization': reactLocalStorage.get('token')
          },
          data:JSON.stringify({username,fname,lname,email,role})
        })
        .then((res)=>{
         console.log(res.data);
         setbtn('Staff Successfully Created');
         setdisablebtn(true)
         closeModal(false);
        //  alert(res.data.message);
         Swal.fire({
            title: 'Message!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'ok'
          });
         
    
        })
        .catch((err)=>{
            setbtn('Create Staff');
            setdisablebtn(false)
            if(err.response){
                alert(err.response.data)
            }
              console.log(err.response)
        })
    


  }

  

  return (
    <div>
      <Modal
        open={modify}
        onClose={closeModal(true)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
        <Card  style={{marginTop:10}}>
              <CardHeader title="Create Staff"/>
                
                <CardContent>
                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type= 'text'
                        label="Username"
                        onChange={handleUsername}
                        value={username || ''}
                        style={{marginBottom:20}}
                        
                
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type='text'
                        label="Firstname"
                        onChange={handleFirstname}
                        value={fname || ''}
                        style={{marginBottom:20}}
                        
                        
                    />
                     <TextField
                        fullWidth
                        autoComplete="current-password"
                        type='text'
                        label="Lastname"
                        style={{marginBottom:20}}
                        onChange={handleLastname}
                        value={lname || ''}
 
                    />
                     <TextField
                        fullWidth
                        autoComplete="current-password"
                        type='email'
                        label="Email"
                        onChange={handleEmail}
                        value={email|| ''}

                        style={{marginBottom:20}} 
                    />
                    <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                    <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role||''}
                        label="Select Role"
                        onChange={handleRole}
                        >
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="Customer Service">Customer Service</MenuItem>
                        <MenuItem value="Quality Asssurance">Quality Asssurance</MenuItem>
                        <MenuItem value="Operation Manager">Operation Manager</MenuItem>
                        <MenuItem value="Digital Asset Agent">Digital Asset Agent</MenuItem>
                    </Select>



                
                    
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:nc-passwords" /> } style={{marginTop:20,marginBottom:20}} disabled={disablebtn} onClick={()=>{CreateStaff()}} >
                       {btn}  (<Iconify icon="arcticons:nc-passwords"/>)
                    </Button>

                   
                </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default Index;
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import * as React from 'react';
import { pink } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import {Checkbox, Select,Grid, Container,MenuItem,InputLabel, Typography,TextField, CardContent,Card,Button, CardHeader,IconButton, InputAdornment, } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


// ----------------------------------------------------------------------

export default function Changepassword({update}) {
  const [statemodal,setstatemodal] = useState(true);
  //   const [handleClose,sethandleClose] = useState(false);
  const [username,setusername] = useState('');
  const [fname,setfname] = useState('');
  const [lname,setlname] = useState('');
  const [email,setemail] = useState('');
  const [role,setrole] = useState('');
  const [btn,setbtn] = useState('Create Staff');
  const [disablebtn,setdisablebtn] = useState(false);
  const [allroles,setallroles] = useState([])
   
  
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
     const getStaffRole = async ()=>{
      const BaseUrl = process.env.REACT_APP_ADMIN_URL  
      await axios({
      
          url:`${BaseUrl}/admin/get/allroles`,
          method:'GET',
          headers:{
            'Content-Type':'application/json',  
            'Authorization': reactLocalStorage.get('token')
          }
          
        })
        .then((res)=>{
         console.log(res.data);
        setallroles(res.data.data)
        //  alert(res.data.message);
        //  Swal.fire({
        //     title: 'Message!',
        //     text: res.data.message,
        //     icon: 'success',
        //     confirmButtonText: 'ok'
        //   });
         
    
        })
        .catch((err)=>{
           
            if(err.response){
                alert(err.response.data)
            }
              console.log(err.response)
        })
    
     }
    

     const _renderRoles = ()=>{
        return  allroles && allroles.length > 0 && allroles.map((d,index)=>{
            return <MenuItem key={index} value={d.rolename}>{d.rolename}</MenuItem>
        })
     }

    useEffect(()=>{
        getStaffRole();
    },[])

  const theme = useTheme();
  return (
    <Page title="Create Staff">
         
      <Container maxWidth="xl">
      
      <Grid item xs={12} md={6} lg={8}>
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
                            {_renderRoles()}
                        </Select>
                        <Typography  gutterBottom>
                            <h2 style={{marginTop:10}}>Add Privilege</h2> 
                            <div className='cover'>
                              <div className='cover-1'>
                                    <div>
                                    
                                      <Checkbox 
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="success" /> <span>Transaction Log</span>
                                    
                                    </div>
                              </div>
                              <div className='cover-2'>
                                <div>
                                  
                                  <Checkbox 
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    color="default" /> 
                                  <span>Transaction Count</span>
                                  
                              </div>
                              </div>
                              <div className='cover-3'>
                                  <div>
                                    
                                    <Checkbox 
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      color="default" /> 
                                    <span>Transaction Count</span>
                                    
                                </div>
                                <div>
                                    
                                    <Checkbox 
                                      inputProps={{ 'aria-label': 'controlled' }}
                                      color="default" /> 
                                    <span>BlackList</span>
                                    
                                </div>
                              </div>
                            </div>          
                            
                           

                        </Typography>
                        

                    
                        
                        <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:nc-passwords" /> } style={{marginTop:20,marginBottom:20}} disabled={disablebtn} onClick={()=>{CreateStaff()}} >
                          {btn}  (<Iconify icon="arcticons:nc-passwords"/>)
                        </Button>

                      
                    </CardContent>
              </Card>

          </Grid>
      </Container>
    </Page>
  );
}

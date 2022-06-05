import { faker } from '@faker-js/faker';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,TextField, CardContent,Card,Button, CardHeader,IconButton, InputAdornment, } from '@mui/material';
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




// ----------------------------------------------------------------------

export default function Changepassword({update}) {
    const navigate = useNavigate()
const [password,setpassword] = useState('');
const [confirmpassword,setconfirmpassword] = useState('');
const [disablebtn,setdisablebtn] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handlepassword = (e)=>{
    setpassword(e.target.value)
}
const handleconfirmpassword = (e)=>{
    setconfirmpassword(e.target.value)
}

const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };


const updatepassword = async ()=>{
    if(!password){
        Swal.fire({
       title: 'oops!',
       text: 'Password Required',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }
   if(!confirmpassword){
        Swal.fire({
            title: 'oops!',
            text: 'Confirm Password Required',
            icon: 'error',
            confirmButtonText: 'ok'
        });
        return false
    }

    if(password !== confirmpassword){
        Swal.fire({
            title: 'oops!',
            text: 'Password/Confirm Password Not Corresponding',
            icon: 'error',
            confirmButtonText: 'ok'
        });
        return false
    }
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setdisablebtn(true);
    await axios({
      url:`${BaseUrl}/admin/set/password`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({password,userid:reactLocalStorage.getObject('admin')._id})
    })
    .then((res)=>{
      console.log(res.data)
      setpassword('')
      setconfirmpassword('')
      setdisablebtn(false);
        reactLocalStorage.remove('admin');
        reactLocalStorage.setObject('admin',res.data.data);
     
      update(true);
      navigate('/dashboard/app',{replace:true})
      Swal.fire({
        title: 'Success Callback!',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'ok'
      });
      
    })
    .catch((err)=>{
     
      if(err.response){
        if(err.response.status === 403){
          console.log(err.response.data.message);
          Swal.fire({
            title: 'Message!',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'ok'
          });
          navigate('/',{replace:true})
          return false;
          
        }
        
            toast.error(err.response.data,'Failed Callback');
    
        console.log(err)
      }
      else{
        console.log(err)
      }
      
      // Swal.fire({
      //   title: 'Message!',
      //   text: err.response.message,
      //   icon: 'error',
      //   confirmButtonText: 'ok'
      // });

    })
}




  const theme = useTheme();
  return (
    <Page title="Dashboard">
         
      <Container maxWidth="xl">
      
      <Grid item xs={12} md={6} lg={8}>
          <Card  style={{marginTop:10}}>
              <CardHeader title="Change Password"/>
                
                <CardContent>
                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        value={password || ''}
                        onChange={handlepassword}
                        style={{marginBottom:20}}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        label=" ConfirmPassword"
                        value={confirmpassword || ''}
                        onChange={handleconfirmpassword}
                        style={{marginBottom:20}}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={handleShowConfirmPassword} edge="end">
                                <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                        
                    />


                
                    
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:nc-passwords" /> } style={{marginTop:5,marginBottom:20}} disabled={disablebtn} onClick={()=>updatepassword()}>
                       Save Password (<Iconify icon="arcticons:nc-passwords"/>)
                    </Button>

                   
                </CardContent>
          </Card>

          </Grid>
      </Container>
    </Page>
  );
}

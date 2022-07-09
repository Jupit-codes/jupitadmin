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
const [rolename,setrolename] = useState('');
const [disablebtn,setdisablebtn] = useState(false)

const handlerole = (e)=>{
    setrolename(e.target.value)
}

const createadminrole = async ()=>{
    if(!rolename){
        Swal.fire({
       title: 'oops!',
       text: 'Role name Required',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }

    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
    setdisablebtn(true);
    await axios({
      url:`${BaseUrl}/admin/create/role`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({rolename})
    })
    .then((res)=>{
      console.log(res.data)
      setdisablebtn(false);
      setrolename('')
      Swal.fire({
        title: 'Success Callback!',
        text: res.data,
        icon: 'success',
        confirmButtonText: 'ok'
      });
      
    })
    .catch((err)=>{
        setdisablebtn(false);
      if(err.response){
        if(err.response.status === 403){
        //   console.log(err.response.data.message);
          Swal.fire({
            title: 'Message!',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'ok'
          });
          navigate('/login',{replace:true})
          return false;
          
        }

        Swal.fire({
          title: 'Message!',
          text: err.response.data,
          icon: 'error',
          confirmButtonText: 'ok'
        });
       
      }
  
    })
}




  const theme = useTheme();
  return (
    <Page title="CreateRole">
         
      <Container maxWidth="xl">
      
      <Grid item xs={12} md={6} lg={8}>
          <Card  style={{marginTop:10}}>
              <CardHeader title="Create Role"/>
                
                <CardContent>
                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type='text'
                        label="Role name"
                        value={rolename || ''}
                        onChange={handlerole}
                        style={{marginBottom:20}}
                       
                
                    />

                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:nc-passwords" /> } style={{marginTop:5,marginBottom:20}} disabled={disablebtn} onClick={()=>createadminrole()}>
                       Create Role (<Iconify icon="ic:twotone-create-new-folder"/>)
                    </Button>

                   
                </CardContent>
          </Card>

          </Grid>
      </Container>
    </Page>
  );
}

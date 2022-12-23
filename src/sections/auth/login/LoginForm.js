import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { reactLocalStorage } from 'reactjs-localstorage';
import Iconify from '../../../components/Iconify';



// ----------------------------------------------------------------------

export default function LoginForm({auth,authState}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  
  const [userid,setuserid] = useState()
  const [data,setdata] = useState()
  const [token,settoken] = useState()

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const CheckStatus =async (userid,data,token)=>{

    console.log(userid);
    await axios({
      method: "POST",
      url: `https://jupit.app/admin/check/login/approval/status`,
      headers:{
          'Content-Type':'application/json',
          'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({userid})

  })
  .then((res)=>{
    if(res.data){
      console.log(res.data)
    }
    console.log(res.data)
    
    if(res.data[0].status === "disapproved"){
      auth(false);
      
      Swal.fire({
        title: 'Denied!',
        text: 'Access Denied..Pls try again',
        icon: 'error',
        confirmButtonText: 'ok'
      });
    }
    else if(res.data[0].status === "approved"){
      auth(false);
     
          reactLocalStorage.set('token',token);
          reactLocalStorage.setObject('admin',data) ;
      console.log('data',data)
          if(data.changepassword){
            navigate("/dashboard/app", { replace: true});
          }
          else{
            navigate('/dashboard/changepassword',{replace:true});
          }
    }
     
   
      
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

          
      }
      
    
      
      
  })
  }


  const LoginStaffProcess = (userid,data,token)=>{
    

      
     

      

    
    
  }

  useEffect(()=>{
    console.log(authState)
    if(authState){
      CheckStatus(userid,data,token);
      const interval =  setInterval(()=>{
       CheckStatus(userid,data,token);
       },10000);
  
       return ()=>clearInterval(interval);
    }

  },[authState])

 

  const login = async ()=>{
   
    const Baseurl = process.env.REACT_APP_ADMIN_URL
    await axios({
        method: "POST",
        url: `${Baseurl}/admin/checklogin`,
        headers:{
            'Content-Type':'application/json',  
        },
      data:JSON.stringify({username:formik.values.username,password:formik.values.password})
    })
    .then((res)=>{
        
        setSubmitting(false);
        if(res.data.document.roleid === 1){
          reactLocalStorage.set('token',res.data.token);
          reactLocalStorage.setObject('admin',res.data.document) ;
         
  
          if(res.data.document.changepassword){
            navigate("/dashboard/app", { replace: true});
          }
          else{
            navigate('/dashboard/changepassword',{replace:true});
          }
        }
        else{
          setdata(res.data.document);
          settoken(res.data.token)
          setuserid(res.data.document._id)
        
          auth(true);
          
        }
        
            
        
      
      
    })
    .catch((err)=>{
        console.log(err.response);
        setSubmitting(false);
        if(err.response){
          if(err.response.status === 403){
          //   console.log(err.response.data.message);
            Swal.fire({
              title: 'Message!',
              text: err.response.data,
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
        else{
          Swal.fire({
            title: 'Message!',
            text: 'No Connection',
            icon: 'error',
            confirmButtonText: 'ok'
          });
        }
        
    })
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {

      
     
      login();

     
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,setSubmitting } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            {...getFieldProps('username')}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

import * as Yup from 'yup';
import { useState } from 'react';
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

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

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
        console.log(res.data)
        setSubmitting(false);
        reactLocalStorage.set('token',res.data.token);
        reactLocalStorage.setObject('admin',res.data.docs) ;
        
          Swal.fire({
          title: 'Message!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        navigate("dashboard/app", { replace: true });
      
      
    })
    .catch((err)=>{
        console.log(err.response);
        setSubmitting(false);
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
          confirmButtonText: 'ok'
        });
        
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

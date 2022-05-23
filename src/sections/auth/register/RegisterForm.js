import * as Yup from 'yup';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import axios from 'axios';
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    userName: Yup.string().required('Username is required'),
  });
const register = async()=>{
  const Baseurl = process.env.REACT_APP_ADMIN_URL
    await axios({
        method: "POST",
        url: `${Baseurl}/admin/onboard/new`,
        headers:{
            'Content-Type':'application/json',  
        },
      data:JSON.stringify({email:formik.values.email,username:formik.values.userName,firstname:formik.values.firstName,lastname:formik.values.lastName})
    })
    .then((res)=>{
        console.log('data',res.data);
        Swal.fire({
        title: 'Message!',
        text: res.data.message,
        icon: 'success',
        confirmButtonText: 'ok'
      });
      setSubmitting(false)
      
    })
    .catch((err)=>{
        console.log(err.response);

        Swal.fire({
        title: 'Message!',
        text: err.response.data,
        icon: 'error',
        confirmButtonText: 'ok'
      });

      setSubmitting(false)
      
        
    })
}

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      register();

      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps,setSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label="Username"
            {...getFieldProps('userName')}
            error={Boolean(touched.userName && errors.userName)}
            helperText={touched.userName && errors.userName}
          />


          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Onboard Admin
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

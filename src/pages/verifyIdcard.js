import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  CardHeader,
  CardContent,
  TextField
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import {
  // AppTasks,
  // AppNewsUpdate,
  // AppOrderTimeline,
  // AppCurrentVisits,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
// mock
import USERLIST from '../_mock/user';
import AwaitingApproval from './fetchpending'



// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function VerifyId() {
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [userData,setuserData]= useState([])


    const verifyme = async ()=>{

        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
        await axios({
        
            url:`${BaseUrl}/admin/get/awaiting/approval`,
            method:'POST',
            headers:{
            'Content-Type':'application/json',  
            'Authorization': reactLocalStorage.get('token')
            },
            
        })
        .then((res)=>{
        
            setLoader(false)
            setDATA(res.data.message)
        })
        .catch((err)=>{
            
                setLoader()
                Swal.fire({
                    title: 'oop!',
                    text: 'Fetch Error..try again',
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                
        })
    }
    
      useEffect(()=>{
        
        setuserData(reactLocalStorage.getObject('data'));
        verifyme();
    },[])




  return (
    <Page title="Idcard Verification">
      <Container>
        
        <Grid container spacing={3}>
            
            <Grid item xs={12} md={6} lg={6}>
            {userData && 'Welcome'}
                <Card  style={{marginTop:10}}>
                    <CardHeader title="User Uploaded Details"/>
                    
                    <CardContent>
                       
                        {reactLocalStorage.getObject('data') && <img src={reactLocalStorage.getObject('data')[0].imagepath} alt="holdId" style={{borderRadius:5}}/> }
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variance="body1" align='left'  gutterBottom>
                                <TextField
                                        label="Firstname"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '20ch' }}
                                        value={ reactLocalStorage.getObject('data')[0].firstname}
                                        variant='filled'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                            </Typography>
                            <Typography variance="body2" align='left'  gutterBottom>
                                <TextField
                                        label="Lastname"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '20ch' }}
                                        value={ reactLocalStorage.getObject('data')[0].lastname}
                                        variant='filled'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                            </Typography>
                        
                    
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variance="body1" align='left'  gutterBottom>
                                <TextField
                                        label="Card Type"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '20ch' }}
                                        value={ reactLocalStorage.getObject('data')[0].cardtype}
                                        variant='filled'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                            </Typography>
                            <Typography variance="body2" align='left'  gutterBottom>
                                <TextField
                                        label="Card Number"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '20ch' }}
                                        value={ reactLocalStorage.getObject('data')[0].cardnumber}
                                        variant='filled'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                            </Typography>
                        
                    
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variance="body1" align='left'  gutterBottom>
                                <TextField
                                        label="Date Of Birth "
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '20ch' }}
                                        value={ reactLocalStorage.getObject('data')[0].dob}
                                        variant='filled'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                            </Typography>
                            <Typography variance="body2" align='left'  gutterBottom>
                                <TextField
                                        label="Created"
                                        id="outlined-start-adornment"
                                        sx={{ m: 1, width: '20ch' }}
                                        value={ reactLocalStorage.getObject('data')[0].updated}
                                        variant='filled'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        />
                            </Typography>
                        
                    
                        </Stack>
                    
                    </CardContent>
            </Card>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <Card  style={{marginTop:10}}>
                    <CardHeader title="Verified Details"/>
                    <CardContent>
                        <h1>Senmatics</h1>
                    </CardContent>

                </Card>
            </Grid>

        </Grid>

        
      </Container>
    </Page>
  );
}

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
    const [fetched,setfetched] = useState();
    const [userData,setuserData]= useState([]);
    const [failedRequest,setFailedRequest] = useState(false)
    const [reject,setReject] = useState(false)
    const [disablebtn,setdisablebtn] = useState(false)
    const navigate = useNavigate();
    const verifyme = async ()=>{
        setLoader(true);
        setReject(false);
        setFailedRequest(false);
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
        await axios({
        
            url:`${BaseUrl}/admin/verify/idcard`,
            method:'POST',
            headers:{
            'Content-Type':'application/json',  
            'Authorization': reactLocalStorage.get('token')
            },
            data:JSON.stringify({_id:reactLocalStorage.getObject('data')[0]._id})
            
        })
        .then((res)=>{
        
            setLoader(false)
            console.log(res.data.message);
            
            setfetched(res.data.message)
            
        })
        .catch((err)=>{
            
                setLoader(false);
                setFailedRequest(true);
                setReject(true);
                console.log(err)
                if(err.response){
                    if(err.response.status === 403){
                    //   console.log(err.response.data.message);
                      Swal.fire({
                        title: 'Message!',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                      });
                      navigate('/',{replace:true})
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
    
    const action = async (event,action)=>{

        event.preventDefault();
        
    
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
        setdisablebtn(true)
        await axios({
        
            url:`${BaseUrl}/admin/kyclevel3/action`,
            method:'POST',
            headers:{
            'Content-Type':'application/json',  
            'Authorization': reactLocalStorage.get('token')
            },
            data:JSON.stringify({email:reactLocalStorage.getObject('data')[0].email,_id:reactLocalStorage.getObject('data')[0].userid,cardtype:reactLocalStorage.getObject('data')[0].cardtype,cardnumber:reactLocalStorage.getObject('data')[0].cardnumber,option:action})
            
        })
        .then((res)=>{
        
            setdisablebtn(false);
            console.log(res.data)
            Swal.fire({
                title: 'Message!',
                text: res.data,
                icon: 'success',
                confirmButtonText: 'ok'
              });

            navigate('/dashboard/awaiting/approval')
            
        })
        .catch((err)=>{
            
            setdisablebtn(false);
                console.log(err.response)
                if(err.response){
                    if(err.response.status === 403){
                    //   console.log(err.response.data.message);
                      Swal.fire({
                        title: 'Message!',
                        text: err.response.data.message,
                        icon: 'error',
                        confirmButtonText: 'ok'
                      });
                      navigate('/',{replace:true})
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

    

      useEffect(()=>{
        
        verifyme();
    },[])

    const renderComponent = ()=>{

         
        return fetched.response ? <>

                    <img src={`data:image/jpeg;base64,${fetched.response.photo}`}  alt="retrievedImg"/>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                        <Typography variance="body1" align='left'  gutterBottom>
                            <TextField
                                    label="Firstname"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ fetched.response.first_name}
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
                                    value={fetched.response.last_name}
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
                                    label="Date Of Birth"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ fetched.response.dob}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                        </Typography>
                        <Typography variance="body2" align='left'  gutterBottom>
                            <TextField
                                    label="Phonenumber"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ fetched.response.mobile}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                        </Typography>
        
    
                    </Stack>
                    <Button variant="contained" fullWidth disabled  className={fetched.faceMatch.verdict === "NOT A MATCH" && 'red'}>
                        FaceMatch:{fetched.faceMatch.verdict}
                    </Button>
                    <Stack  direction="row" alignItems="center" justifyContent="space-around" mt={4}>
                        <Button variant="contained"  onClick={(event)=>action(event,'approve')} disabled={disablebtn}>
                            Approved
                        </Button>
                        <Button variant="contained"  disabled={disablebtn}  onClick={(event)=>action(event,'disapprove')} className={fetched.faceMatch.verdict === "NOT A MATCH" && 'red'}>
                            Reject
                        </Button>
                    </Stack>
                    
                
                </>
                 : <>
                 {fetched.description}
                 <Stack  direction="row" alignItems="center" justifyContent="space-around" mt={4}>
                        <Button variant="contained" disabled={disablebtn} onClick={(event)=>action(event,'approve')} >
                            Approved
                        </Button>
                        <Button variant="contained" disabled={disablebtn} onClick={(event)=>action(event,'disapprove')}  className= 'red' >
                            Reject
                        </Button>
                    </Stack>
                 
                 </>
        
 
        
    }
    const handleback =()=>{
        window.location=`/dashboard/awaiting/approval`
      }

  return (
    <Page title="Idcard Verification">
             <Stack direction="row" alignItems="center" justifyContent="start" mb={2} style={{cursor:'pointer'}} onClick={(e)=>{handleback()}}>
          <Typography variant="h3" gutterBottom mt={1}  >
            <Iconify icon="ic:outline-arrow-back-ios-new"   />
          </Typography>
          <Typography variant="h3" gutterBottom ml={1}  style={{cursor:'pointer',fontSize:18,display:'flex',alignItems:'center'}}>
            Back
          </Typography>
        </Stack>
      <Container>
        
        <Grid container spacing={3}>
            
            <Grid item xs={12} md={6} lg={6}>
            {userData && ''}
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
                        {loader && <div className='myloader'>Verifying data...</div> }
                        {!loader && fetched && fetched && renderComponent()}
                        {failedRequest && <div className='myloader'><small>Verification Failed...Click Below to Reload</small><Iconify icon="icon-park-twotone:reload" width="48px" height="48px" onClick={()=>{verifyme()}}/></div>}
                        {reject && 
                            <Stack  direction="row" alignItems="center" justifyContent="space-around" mt={4}>
                                <Button variant="contained" disabled={disablebtn} onClick={()=>action('disapprove')} className='red'>
                                    Reject
                                </Button>
                        
                            </Stack>
                    }
                    </CardContent>

                </Card>
            </Grid>

        </Grid>

        
      </Container>
    </Page>
  );
}

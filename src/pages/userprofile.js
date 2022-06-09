
import '../App.css'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate, useParams } from 'react-router-dom';
// material
import {
  Card,
  CardContent,
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
  useTheme,
  TextField,
  getAccordionSummaryUtilityClass,
  
} from '@mui/material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
// components
import BiggerLoader from '../utils/loader'
import Page from '../components/Page';
import Iconify from '../components/Iconify';


import UserTransaction from './user_transaction'

import {
  // AppTasks,
  // AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  // AppTrafficBySite,
  AppWidgetSummary,
  AppWidgetSummaryEdit
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
// mock
import USERLIST from '../_mock/user';




// ----------------------------------------------------------------------



export default function User() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [btcbalance,setbtcbalance] = useState();
  const [usdtbalance,setusdtbalance] = useState();
  const [nairabalance,setnairabalance] = useState();
  const [bigloader,setbigLoader] = useState(true)

  const [username,setusername] = useState();
  const [phonenumber,setphonenumber] = useState();
  const [email,setemail] = useState();
  const [doc,setdoc] = useState();
  const[bank,setbank] = useState();
  const [accountnumber,setaccountnumber] = useState()
  const [twofactor,settwofactor] = useState();
  const [status, setstatus] = useState('')
  const [DATA,setDATA] = useState([]);


  const [btcmarketprice,setbtcmarketprice] = useState(0);
  const [btcmarketpricedisplay,setbtcmarketpricedisplay] = useState('');

  const [usdtmarketprice,setusdtmarketprice] = useState(0);
  const [usdtmarketpricedisplay,setusdtmarketpricedisplay] = useState('');

  const [marketdata,setmarketdata] = useState([])

  const [jupitbtcbuyrate,setjupitbtcbuyrate] = useState(0);
  const [jupitusdtbuyrate,setjupitusdtbuyrate] = useState(0);

  const [refresh,setrefresh] = useState(false)
  const [fname,setfname] = useState('')
  const [lname,setlname] = useState('')
  const [kyclevel1,setkyclevel1] = useState('');
  const [kyclevel2,setkyclevel2] = useState('')
  const [kyclevel3,setkyclevel3] = useState('')
  const [useractivate_deactivate,setuseractivate_deactivate] = useState(false)
  const [twofactbtn,settwofactbtn] = useState(false)

  const { id } = useParams();
  const getAllUserDetails = async ()=>{
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
  
    await axios({
      url:`${BaseUrl}/admin/get/all/users/id`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({id})
    })
    .then((res)=>{
      
      setkyclevel1(res.data.kyc.level1[0].status);
      setkyclevel2(res.data.kyc.level2[0].event_status);
      setkyclevel3(res.data.kyc.level3[0].status);
      setjupitbtcbuyrate(res.data.rate[0].btc[0].buy);
      setjupitusdtbuyrate(res.data.rate[0].usdt[1].buy);
      setbtcbalance(res.data.detail.btc_wallet[0].balance.$numberDecimal);
      setusdtbalance(res.data.detail.usdt_wallet[0].balance.$numberDecimal);
      setnairabalance(res.data.detail.naira_wallet[0].balance.$numberDecimal);
      setstatus(res.data.detail.Status)
      setusername(res.data.detail.username);
      setfname(res.data.detail.firstname);
      setlname(res.data.detail.lastname)
      setemail(res.data.detail.email);
      setphonenumber(res.data.detail.phonenumber);
      setdoc(res.data.detail.updated);
      setbank(res.data.bank.bank_code);
      setaccountnumber(res.data.bank.account_number)
        settwofactor(res.data.detail.TWOFA);
        
      setbigLoader(false);

      // console.log(res.data.twofactor)

      

    })
    .catch((err)=>{
      setbigLoader(false)
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

  
    const marketprice = ()=>{
        axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,USDT&tsyms=USD',{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Apikey 475906935b55657e131801270facf7cd73a797ee9cff36bbb24185f751c18d63'
        }
    })
    .then(res=>{
   
      setmarketdata(res.data);
      setbtcmarketprice(res.data.RAW.BTC.USD.PRICE);
      setbtcmarketpricedisplay(res.data.DISPLAY.BTC.USD.PRICE);
      setusdtmarketprice(res.data.RAW.USDT.USD.PRICE);
      setusdtmarketpricedisplay(res.data.DISPLAY.USDT.USD.PRICE);
    
    })
    .catch(err=>{
      console.log(err)
    })
    }

    const disabletwofactor = async(e)=>{
      e.preventDefault();
    
      settwofactbtn(true)
      const BaseUrl = process.env.REACT_APP_ADMIN_URL;
    
      await axios({
        url:`${BaseUrl}/admin/deactivate/2fa`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization':reactLocalStorage.get('token')
        },
        data:JSON.stringify({id})
      })
      .then((res)=>{
        console.log(res.data)
        twofactor(false);
        settwofactbtn(false);
        
  
      })
      .catch((err)=>{
        settwofactbtn(false);
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

    const handleActiveAccount = async (e,status)=>{
      e.preventDefault();
      let updatestatus = ""
      if(status === "Active"){
          updatestatus = "Non-Active";
      }
      else{
        updatestatus = "Active";
      }
      setuseractivate_deactivate(true)
      const BaseUrl = process.env.REACT_APP_ADMIN_URL;
    
      await axios({
        url:`${BaseUrl}/admin/deactivate/user/profile`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization':reactLocalStorage.get('token')
        },
        data:JSON.stringify({id,updatestatus})
      })
      .then((res)=>{
        console.log(res.data)
        setstatus(updatestatus)
        setuseractivate_deactivate(false);
        
  
      })
      .catch((err)=>{
        setuseractivate_deactivate(false);
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

    useEffect(()=>{
        setbigLoader(true);
        getAllUserDetails();
        

    },[refresh])

    useEffect(()=>{
        marketprice();
    },[marketdata])
  return (
    <Page title="UserProfile">
        {bigloader && <BiggerLoader/>}
      <Container>

      <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummaryEdit title="BTC Wallet Balance" color="warning" total={btcbalance} icon={'cryptocurrency:btc'} edit={'bx:edit'} userid={id} livemarket={btcmarketpricedisplay} livemarketdata={btcmarketprice} jupitrate={jupitbtcbuyrate}  refreshPage={setrefresh} refresh={refresh}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummaryEdit title="USDT Wallet Balance"  color="success" total={usdtbalance} icon={'cryptocurrency:usdt'} edit={'bx:edit'} userid={id}  livemarket={usdtmarketpricedisplay} livemarketdata={usdtmarketprice} jupitrate={jupitusdtbuyrate} refreshPage={setrefresh}  refresh={refresh}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <AppWidgetSummaryEdit title="Naira Wallet Balance" total={nairabalance} icon={'tabler:currency-naira'} edit={'bx:edit'} userid={id} refreshPage={setrefresh} livemarket={500}  refresh={refresh}/>
            </Grid>


            <Grid item xs={12} md={6} lg={8}>
            <Card style={{padding:20}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom mb={5}>
                        User Profile Details
                    </Typography>
                    <Typography variant="h4" gutterBottom mb={5}>

                    <Button variant="outlined" component={RouterLink} to="#" color="error"  onClick={(e)=>{disabletwofactor(e)}} disabled={!twofactor || twofactbtn}   startIcon={<Iconify icon="arcticons:microsoftauthenticator" />}>
                        {twofactor ? 'Disable 2FA':'2FA not activated'}
                        
                    </Button>
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography   gutterBottom>
                        <TextField
                            label="Firstname"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={fname || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </Typography>
                    <Typography align='left' gutterBottom>
                    <TextField
                            label="Lastname"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={lname || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        
                    </Typography>
                </Stack>
                    
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography   gutterBottom>
                        <TextField
                            label="Username"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={username || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </Typography>
                    <Typography align='left' gutterBottom>
                    <TextField
                            label="Phonenumber"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={phonenumber || ''}
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
                            label="Email"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={email || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Typography>
                    <Typography    align='left'gutterBottom>
                        <TextField
                            label="Date Of Creation"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                           
                            value={doc || ''}
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
                            label="Bank"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={bank || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Typography>
                    <Typography    align='left'gutterBottom>
                        <TextField
                            label="Account Number"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={accountnumber || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Typography>
                    
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
                   
                    <Typography variant="h4" gutterBottom mb={5}>

                      <Button variant="outlined" component={RouterLink} to="#"  startIcon={<Iconify icon="arcticons:microsoftauthenticator" />}>
                          Edit Profile
                          
                      </Button>
                    </Typography>
                </Stack>
               
                
                </Card>
                
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <Card style={{padding:20}}>
            
              <Stack direction="row" alignItems="left" justifyContent="space-between" mb={2}>
                  <Button variant="contained" onClick={(e)=>{handleActiveAccount(e,status)}}  component={RouterLink} to="#" color={status === "Active" ? 'error' :'primary'} disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                      {status === "Active" ? "Deactivate Account":"Active Account"}
                  </Button>   
                </Stack>
                <Stack direction="row" alignItems="left" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom mb={5}>
                        KYC (Know Your Client)
                    </Typography>
                   
                </Stack>

                <Stack direction="row"  alignItems="center" mb={2}>
                
                  <Timeline position="alternate">
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color={kyclevel1 === "Verified" ? 'success': 'error'}/>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>KYC LEVEL 1</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color={kyclevel2 === "customeridentification.success" ? 'success': 'error'} />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>KYC LEVEL 2</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color={kyclevel3  ? 'success': 'error'} />
                      </TimelineSeparator>
                      <TimelineContent>KYC LEVEL 3</TimelineContent>
                    </TimelineItem>
                </Timeline>
                </Stack>

                

                </Card>
            </Grid>

         
        </Grid>

        

        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
            <UserTransaction userid={id}/>
          </Grid>



        
      </Container>
    </Page>
  );
}

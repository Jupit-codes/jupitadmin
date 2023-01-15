
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
import { CSVLink } from "react-csv";
// components
import BiggerLoader from '../utils/loader'
import Page from '../components/Page';
import Iconify from '../components/Iconify';


import UserTransaction from './user_transaction'
import FetchTransaction from './fetchtransaction'

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
  const [blackliststatus, setblackliststatus] = useState()
  const [suspensionstatus, setsuspensionstatus] = useState()
  const [DATA,setDATA] = useState([]);

  const [edit_email,set_edit_email] = useState('')


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
  const [twofactbtn,settwofactbtn] = useState(false);
  const [editprofile,seteditprofile] = useState('Edit Profile')
  const [disablebtn,setdisablebtn] = useState(false)
  const [bvn,setbvn] = useState()
  const [bankType,setbankType] = useState()
  const { id } = useParams();
  
const banks = [
  { "id": "1", "name": "Access Bank" ,"code":"044" },
  { "id": "2", "name": "Citibank","code":"023" },
  { "id": "3", "name": "Diamond Bank","code":"063" },
  { "id": "4", "name": "Dynamic Standard Bank","code":"" },
  { "id": "5", "name": "Ecobank Nigeria","code":"050" },
  { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
  { "id": "7", "name": "First Bank of Nigeria","code":"011" },
  { "id": "8", "name": "First City Monument Bank","code":"214" },
  { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
  { "id": "10", "name": "Heritage Bank Plc","code":"030" },
  { "id": "11", "name": "Jaiz Bank","code":"301" },
  { "id": "12", "name": "Keystone Bank Limited","code":"082" },
  { "id": "13", "name": "Providus Bank Plc","code":"101" },
  { "id": "14", "name": "Polaris Bank","code":"076" },
  { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
  { "id": "16", "name": "Standard Chartered Bank","code":"068" },
  { "id": "17", "name": "Sterling Bank","code":"232" },
  { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
  { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
  { "id": "20", "name": "United Bank for Africa","code":"033" },
  { "id": "21", "name": "Unity Bank Plc","code":"215" },
  { "id": "22", "name": "Wema Bank","code":"035" },
  { "id": "23", "name": "Zenith Bank","code":"057" }
]
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
    .then(async(res)=>{
      const priceMarket = await crypomarketprice();
      console.log("price",priceMarket)
    
      setkyclevel1(res.data.kyc.level1[0].status);
      setkyclevel2(res.data.kyc.level2[0].event_status);
      setkyclevel3(res.data.kyc.level3[0].status);
      setjupitbtcbuyrate(res.data.rate[0].btc[0].buy);
      setjupitusdtbuyrate(res.data.rate[0].usdt[1].buy);
      setbtcbalance(parseFloat(res.data.detail.btc_wallet[0].balance.$numberDecimal).toFixed(8));
      setusdtbalance(parseFloat(res.data.detail.usdt_wallet[0].balance.$numberDecimal).toFixed(6));
      setnairabalance(res.data.detail.naira_wallet[0].balance.$numberDecimal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setstatus(res.data.detail.Status)
      setusername(res.data.detail.username);
      setfname(res.data.detail.firstname);
      setlname(res.data.detail.lastname)
      setemail(res.data.detail.email);
      setphonenumber(res.data.detail.phonenumber);
      setdoc(res.data.detail.updated);
      setbank(res.data.bank.bank_code);
      setaccountnumber(res.data.bank.account_number)
      setbvn(res.data.bank.bvn)
        settwofactor(res.data.detail.TWOFA);
        setblackliststatus(res.data.blacklist);
        setsuspensionstatus(res.data.suspension);
      setbigLoader(false);
      
      if(priceMarket[0]){
      
        setbtcmarketprice(priceMarket[1])
        setusdtmarketprice(priceMarket[2])
        setbtcmarketpricedisplay(parseFloat(parseFloat(res.data.detail.btc_wallet[0].balance.$numberDecimal) * parseFloat(priceMarket[1])).toFixed(7));
        setusdtmarketpricedisplay(parseFloat(parseFloat(res.data.detail.usdt_wallet[0].balance.$numberDecimal) * parseFloat(priceMarket[2])).toFixed(6));
        
      }

      banks.map((d)=>{
        
        if(d.code === res.data.bank.bank_code){
          setbankType(d.name)
        }

        return true
      })

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
          navigate('/login',{replace:true})
          return false;
          
        }
        console.log(err.response.data)
        Swal.fire({
          title: 'Message!',
          text: err.response,
          icon: 'error',
          confirmButtonText: 'ok'
        });
       
      }
      else{
        console.log("No Connection")
        // Swal.fire({
        //   title: 'Message!',
        //   text: 'No Connection',
        //   icon: 'error',
        //   confirmButtonText: 'ok'
        // });
      }

    })
  }

  
    // const marketprice = ()=>{
    //     axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,USDT&tsyms=USD',{
    //     headers:{
    //         'Content-Type':'application/json',
    //         'Authorization':'Apikey fab6779bb25e937fa7ef922e132796d2c323635c431bc1f3185faf7b293633c5'
    //     }
    // })
    // .then(res=>{
   
    //   setmarketdata(res.data);
    //   setbtcmarketprice(res.data.RAW.BTC.USD.PRICE);
    //   setbtcmarketpricedisplay(res.data.DISPLAY.BTC.USD.PRICE);
    //   setusdtmarketprice(res.data.RAW.USDT.USD.PRICE);
    //   setusdtmarketpricedisplay(res.data.DISPLAY.USDT.USD.PRICE);
    
    // })
    // .catch(err=>{
    //   console.log(err)
    // })
    // }

    const crypomarketprice = async ()=>{
      const myresult = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether,bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false',{
          headers:{
              'Content-Type':'application/json',
             
          }
      })
      .then(result=>{
          console.log(result.data)
         if(result.data){
          const BTC = parseFloat(result.data[0].current_price) - 150;
          const USDT = result.data[1].current_price
          // setBTCprice(BTC);
          // setUSDTprice(USDT);

          return [true,BTC,USDT];
          
         }
         
          return [false,0,0]
  
         
         
         
      })
      .catch(err=>{
          console.log(err)
          // return [false]
      })

      return myresult;

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
    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleEdit = async (e)=>{
      e.preventDefault();
     seteditprofile('Save');
     
      if(edit_email){

        if(validateEmail(edit_email)){
          const BaseUrl = process.env.REACT_APP_ADMIN_URL;
          setdisablebtn(true);
          await axios({
            url:`${BaseUrl}/admin/edit/user/email`,
            method:'POST',
            headers:{
              'Content-Type':'application/json',  
              'Authorization':reactLocalStorage.get('token')
            },
            data:JSON.stringify({id,email:edit_email})
          })
          .then((res)=>{
            
            setdisablebtn(false);
            setemail(edit_email);
            set_edit_email('')
            seteditprofile('Edit Profile')
            Swal.fire({
              title: 'Message!',
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
         else{
           alert('invalid Email')
         }

      }

    
    }


    const handleSuspension = async (e,suspensionstatus)=>{
      e.preventDefault();
      let updatestatus = false
      if(suspensionstatus){
          updatestatus = false ;
      }
      else{
        updatestatus = true;
      }

      console.log(updatestatus)
      setuseractivate_deactivate(true)
      const BaseUrl = process.env.REACT_APP_ADMIN_URL;
    
      await axios({
        url:`${BaseUrl}/admin/deactivate/user/suspension`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization':reactLocalStorage.get('token')
        },
        data:JSON.stringify({id,updatestatus})
      })
      .then((res)=>{
        console.log(res.data)
        setsuspensionstatus(updatestatus)
        setuseractivate_deactivate(false);
        
  
      })
      .catch((err)=>{
        setuseractivate_deactivate(false);
        
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

    
    const handleBlacklist = async (e,blackliststatus)=>{
      e.preventDefault();
      let updatestatus = false
      if(blackliststatus){
          updatestatus = false ;
      }
      else{
        updatestatus = true;
      }
      setuseractivate_deactivate(true)
      const BaseUrl = process.env.REACT_APP_ADMIN_URL;
    
      await axios({
        url:`${BaseUrl}/admin/deactivate/user/blacklist`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization':reactLocalStorage.get('token')
        },
        data:JSON.stringify({id,updatestatus})
      })
      .then((res)=>{
        console.log(res.data)
        setblackliststatus(updatestatus)
        setuseractivate_deactivate(false);
        
  
      })
      .catch((err)=>{
        setuseractivate_deactivate(false);
        
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






    const handleEditEmail = (e)=>{
      set_edit_email(e.target.value);
     
    }
    useEffect(()=>{
        setbigLoader(true);
        getAllUserDetails();
        

    },[refresh])
    const x = reactLocalStorage.getObject('admin').previledge;
    const role = reactLocalStorage.getObject('admin').role;
    console.log(x)
    const _renderBalances = ()=>{
     
      return x.map(d=>{
        if(d.includes('Customer Balances')){
         
          return  <>
                    <Grid item xs={12} sm={6} md={4}>
                      <AppWidgetSummaryEdit title="BTC Wallet Balance" color="warning" total={btcbalance} icon={'cryptocurrency:btc'} withdrawal={'carbon:subtract-alt'} edit={'carbon:alarm-add'} userid={id} livemarket={btcmarketpricedisplay} livemarketdata={btcmarketprice} jupitrate={jupitbtcbuyrate}  refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="USDT Wallet Balance"  color="success" total={usdtbalance} icon={'cryptocurrency:usdt'} withdrawal={'carbon:subtract-alt'} edit={'carbon:alarm-add'} userid={id}  livemarket={usdtmarketpricedisplay} livemarketdata={usdtmarketprice} jupitrate={jupitusdtbuyrate} refreshPage={setrefresh}  refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Naira Wallet Balance" total={nairabalance} icon={'tabler:currency-naira'} withdrawal={'carbon:subtract-alt'} edit={'carbon:alarm-add'} userid={id} refreshPage={setrefresh}   refresh={refresh}/>
                    </Grid>
                  </>
        }
        if(d.includes('All') && role === "Super Admin" ){
         
          return  <>
                    <Grid item xs={12} sm={6} md={4}>
                      <AppWidgetSummaryEdit title="BTC Wallet Balance" color="warning" total={btcbalance} l icon={'cryptocurrency:btc'} withdrawal={'carbon:subtract-alt'} edit={'carbon:alarm-add'} userid={id} livemarket={btcmarketpricedisplay} livemarketdata={btcmarketprice} jupitrate={jupitbtcbuyrate}  refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="USDT Wallet Balance"  color="success" total={usdtbalance} icon={'cryptocurrency:usdt'} withdrawal={'carbon:subtract-alt'} edit={'carbon:alarm-add'} userid={id}  livemarket={usdtmarketpricedisplay} livemarketdata={usdtmarketprice} jupitrate={jupitusdtbuyrate} refreshPage={setrefresh}  refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Naira Wallet Balance" total={nairabalance} icon={'tabler:currency-naira'} withdrawal={'carbon:subtract-alt'} edit={'carbon:alarm-add'} userid={id} refreshPage={setrefresh} livemarket={0.00}  refresh={refresh}/>
                    </Grid>
                  </>
        }

        return null
        
        
      })
     
    }

      const _renderEditProfile = ()=>{
        return x.map(d=>{
          if(d.includes('All') && role=== "Super Admin" ){
            return  <>
                    <Button variant="outlined" disabled={disablebtn} component={RouterLink} to="#" onClick={(e)=>{handleEdit(e)}} startIcon={<Iconify icon="arcticons:microsoftauthenticator" />}>
                            {editprofile}
                            
                      </Button>
                    </>
          }
          return null
          
          
        })
    }

    
    const _renderBlock = ()=>{
      return x.map(d=>{
        if(d.includes('Account Block')){
          return  <>
                    <Button variant="contained" onClick={(e)=>{handleActiveAccount(e,status)}}  component={RouterLink} to="#" color={status === "Active" ? 'error' :'primary'} disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                        {status === "Active" ? "Deactivate Account":"Active Account"}
                    </Button>
                  </>
        }
        if(d.includes('All') && role === "Super Admin"){
          return  <>
                    <Button variant="contained" onClick={(e)=>{handleActiveAccount(e,status)}}  component={RouterLink} to="#" color={status === "Active" ? 'error' :'primary'} disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                        {status === "Active" ? "Deactivate Account":"Active Account"}
                    </Button>
                  </>
        }

        
        return null
        
        
      })
  }


    const _renderSuspension = ()=>{
      return x.map(d=>{
        if(d.includes('Account Suspension')){
          return  <>
                    <Button variant="contained" onClick={(e)=>{handleSuspension(e,suspensionstatus)}}  component={RouterLink} to="#" color={suspensionstatus ? 'error' :'primary'} disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                        {suspensionstatus ? "Unsuspend Account":"Suspend Account"}
                      </Button>
                  </>
        }
        if(d.includes('All') && role === "Super Admin"){
          return  <>
                    <Button variant="contained" onClick={(e)=>{handleSuspension(e,suspensionstatus)}}  component={RouterLink} to="#" color={suspensionstatus ? 'error' :'primary'} disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                        {suspensionstatus ? "Unsuspend Account":"Suspend Account"}
                      </Button>
                  </>
        }

       
        return null
        
        
      })
    }

    const _render2fa = ()=>{
      return x.map(d=>{
        if(d.includes('Disable 2FA')){
          return  <>
                    
                    <Button variant="outlined" component={RouterLink} to="#" color="error"  onClick={(e)=>{disabletwofactor(e)}} disabled={!twofactor || twofactbtn}   startIcon={<Iconify icon="arcticons:microsoftauthenticator" />}>
                        {twofactor ? 'Disable 2FA':'2FA not activated'}
                        
                    </Button>
                  </>
        }
        if(d.includes('All') && role ==="Super Admin"){
          return  <>
                    <Button variant="outlined" component={RouterLink} to="#" color="error"  onClick={(e)=>{disabletwofactor(e)}} disabled={!twofactor || twofactbtn}   startIcon={<Iconify icon="arcticons:microsoftauthenticator" />}>
                        {twofactor ? 'Disable 2FA':'2FA not activated'}
                        
                    </Button>
                  </>
        }



        
        return null
        
        
      })
    }

    const _renderBlacklist = ()=>{
      return x.map(d=>{
        if(d.includes('Blacklist')){
          return  <>
                    <Button variant="contained" onClick={(e)=>{handleBlacklist(e,blackliststatus)}}  component={RouterLink} to="#" color={blackliststatus ? 'error' :'primary'}  disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                      {blackliststatus ? "Remove Blacklist":"Blacklist Account"}
                      </Button>  
                  </>
        }
        if(d.includes('All') && role === "Super Admin"){
          return  <>
                    <Button variant="contained" onClick={(e)=>{handleBlacklist(e,blackliststatus)}}  component={RouterLink} to="#" color={blackliststatus ? 'error' :'primary'}  disabled={useractivate_deactivate} startIcon={<Iconify icon="clarity:export-line" />}>
                      {blackliststatus ? "Remove Blacklist":"Blacklist Account"}
                      </Button>  
                  </>
        }

        return null
        
        
      })
    }

  const _renderTradelog = ()=>{

    return x.map(d=>{
      if(d.includes('Trade Log')){
        return  <>
                    <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
                      <Stack  direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" xs={12} sm={6} md={4} sx={{ mb: 5 }}>
                          <Typography variant="h4" gutterBottom mb={5}>
                                Trade Logs (USDT/BTC)
                          </Typography>

                          <CSVLink data={DATA}>
                              <Button variant="contained" startIcon={<Iconify icon="clarity:export-line" />}>
                                Export To CsV
                            </Button>
                        </CSVLink>

                      </Stack>
                        
                        
                      {/* <UserTransaction userid={id} handleData = {setDATA}/> */}
                      <UserTransaction handleData={setDATA} userid={id} />


                    </Grid>
              
                </>
      }

      if(d.includes('All') && role === "Super Admin"){
        return  <>
                    <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
                      <Stack  direction="row" flexWrap="wrap" alignItems="center" justifyContent="space-between" xs={12} sm={6} md={4} sx={{ mb: 5 }}>
                          <Typography variant="h4" gutterBottom mb={5}>
                                Trade Logs (USDT/BTC)
                          </Typography>

                          <CSVLink data={DATA}>
                              <Button variant="contained" startIcon={<Iconify icon="clarity:export-line" />}>
                                Export To CsV
                            </Button>
                        </CSVLink>

                      </Stack>
                        
                        
                      {/* <UserTransaction userid={id} handleData = {setDATA}/> */}
                      <UserTransaction handleData={setDATA} userid={id} />


                    </Grid>
              
                </>
      }



      
      return null
      
      
    })

    
  }



    const handleback =()=>{
      window.location=`/dashboard/user`
    }
  return (
    <Page title="UserProfile">
        {bigloader && <BiggerLoader/>}
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
      
          {
              _renderBalances()

          }
            <Grid item xs={12} md={6} lg={8}>
            <Card style={{padding:20}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom mb={5}>
                        User Profile Details
                    </Typography>
                    <Typography variant="h4" gutterBottom mb={5}>
                      {_render2fa()}
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
                      {
                        editprofile === "Save" && 
                        
                        <TextField 
                         label="New Email"
                          id="outlined-start-adornment"
                          sx={{ m: 1, width: '30ch' }}
                          value={edit_email}
                          onChange={handleEditEmail}
                          
                        />
                      }
                      {
                        editprofile === "Edit Profile" && 
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

                      }
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
                            
                            value={bankType || ''}
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
                      <Typography  align='left' gutterBottom>
                        <TextField
                            label="BVN"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={bvn || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Typography>

                    <Typography variance="body1" align='left'  gutterBottom>
                    <TextField
                            label="Bank Code"
                            id="outlined-start-adornment"
                            sx={{ m: 1, width: '30ch' }}
                            
                            value={bank || ''}
                            variant='filled'
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                    </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" mb={2}>
                   
                    <Typography variant="h4" gutterBottom mb={5}>

                      {_renderEditProfile()}
                    </Typography>
                </Stack>
               
                
                </Card>
                
            </Grid>

            
            <Grid item xs={12} md={6} lg={4}>
            <Card style={{padding:20}}>
            
                <Stack direction="row" alignItems="left" justifyContent="space-between" mb={2}>
                  {_renderBlock()}   
                </Stack>
                <Stack direction="row" alignItems="left" justifyContent="space-between" mb={2}>
                 {_renderSuspension()}   
                </Stack>
                <Stack direction="row" alignItems="left" justifyContent="space-between" mb={2}>
                  {_renderBlacklist()}  
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

        

       {_renderTradelog()}



        
      </Container>
    </Page>
  );
}

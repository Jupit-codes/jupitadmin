import { faker } from '@faker-js/faker';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,TextField, CardContent,Card,Button, CardHeader } from '@mui/material';
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

export default function SetRate() {
    const navigate = useNavigate()
const [usdtsell,setusdtsell] = useState();
const [btcsell,setbtcsell] = useState();
const [giftcardsell,setgiftcardsell] = useState();

const [usdtbuy,setusdtbuy] = useState();
const [btcbuy,setbtcbuy] = useState();
const [giftcardbuy,setgiftcardbuy] = useState();

const [giftcardDisablebuy,setgiftcardDisablebuy] = useState(false)
const [giftcardDisablesell,setgiftcardDisablesell] = useState(false)

const [btcDisablebuy,setbtcDisablebuy] = useState(false)
const [btcDisablesell,setbtcDisablesell] = useState(false)

const [usdtDisablebuy,setusdtDisablebuy] = useState(false)
const [usdtDisablesell,setusdtDisablesell] = useState(false)



const handleBtcBuy = (e)=>{
    setbtcbuy(e.target.value)
}

const handleBtcSell = (e)=>{
    setbtcsell(e.target.value)
}

const handleUsdtSell = (e)=>{
    setusdtsell(e.target.value)
}
const handleUsdtBuy = (e)=>{
    setusdtbuy(e.target.value)
}

const handleGiftcardSell = (e)=>{
    setgiftcardsell(e.target.value)
}
const handleGiftcardBuy = (e)=>{
    setgiftcardbuy(e.target.value)
}

const updateGiftcardSell = async ()=>{

    if(!giftcardsell){
         Swal.fire({
        title: 'oops!',
        text: 'Invalid Parameter',
        icon: 'error',
        confirmButtonText: 'ok'
      });
      return false
    }

    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setgiftcardDisablesell(true);
    await axios({
      url:`${BaseUrl}/admin/set/rate/giftcard`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({giftcard_sell:giftcardsell,type:"GIFTCARD_SELL"})
    })
    .then((res)=>{
      console.log(res.data)
      setgiftcardsell('')
      setgiftcardDisablesell(false);
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


const updateGiftcardBuy = async ()=>{
    if(!giftcardbuy){
        Swal.fire({
       title: 'oops!',
       text: 'Invalid Parameter',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setgiftcardDisablebuy(true);
    await axios({
      url:`${BaseUrl}/admin/set/rate/giftcard`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({giftcard_buy:giftcardbuy,type:"GIFTCARD_BUY"})
    })
    .then((res)=>{
      console.log(res.data)
      setgiftcardbuy('')
      setgiftcardDisablebuy(false);
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


const updateUsdtBuy = async ()=>{
    if(!usdtbuy){
        Swal.fire({
       title: 'oops!',
       text: 'Invalid Parameter',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setusdtDisablebuy(true);
    await axios({
      url:`${BaseUrl}/admin/set/rate/usdt`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({usdt_buy:usdtbuy,type:"USDT_BUY"})
    })
    .then((res)=>{
      console.log(res.data)
      setusdtbuy('')
      setusdtDisablebuy(false);
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



const updateUsdtSell = async ()=>{
    if(!usdtsell){
        Swal.fire({
       title: 'oops!',
       text: 'Invalid Parameter',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setusdtDisablesell(true);
    await axios({
      url:`${BaseUrl}/admin/set/rate/usdt`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({usdt_sell:usdtsell,type:"USDT_SELL"})
    })
    .then((res)=>{
      console.log(res.data)
      setusdtsell('')
      setusdtDisablesell(false);
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


const updateBtcSell = async ()=>{
    if(!btcsell){
        Swal.fire({
       title: 'oops!',
       text: 'Invalid Parameter',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setbtcDisablesell(true);
    await axios({
      url:`${BaseUrl}/admin/set/rate/btc`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({btc_sell:btcsell,type:"BTC_SELL"})
    })
    .then((res)=>{
      console.log(res.data)
      setbtcsell('')
      setbtcDisablesell(false);
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


const updateBtcBuy = async ()=>{
    if(!btcbuy){
        Swal.fire({
       title: 'oops!',
       text: 'Invalid Parameter',
       icon: 'error',
       confirmButtonText: 'ok'
     });
     return false
   }
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   setbtcDisablebuy(true);
    await axios({
      url:`${BaseUrl}/admin/set/rate/btc`,
      method:'POST',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
      data:JSON.stringify({btc_buy:btcbuy,type:"BTC_BUY"})
    })
    .then((res)=>{
      console.log(res.data)
      setbtcbuy('')
      setbtcDisablebuy(false);
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
      
      <Typography variant="h4" sx={{ mb: 5 }}>
          Rate Portal.
        </Typography>
      <Grid item xs={12} md={6} lg={8}>
          <Card  style={{marginTop:10}}>
              <CardHeader title="BTC RATE BOARD"/>
                
                <CardContent>
                    <TextField fullWidth label="Set Buy Rate BTC" id="fullWidth"  type="number" value={btcbuy || ''}  onChange={handleBtcBuy} />
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:microsoftauthenticator" /> } style={{marginTop:5,marginBottom:20}} disabled={btcDisablebuy} onClick={()=>updateBtcBuy()}>
                       Save Buy Rate (<Iconify icon="cryptocurrency:btc"/>)
                    </Button>

                    <TextField fullWidth label="Set Sell Rate BTC" id="fullWidth"  type="number"  value={btcsell || ''}  onChange={handleBtcSell}/>
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:microsoftauthenticator" /> } style={{marginTop:5}} disabled={btcDisablesell} onClick={()=>updateBtcSell()}>
                       Save Sell Rate (<Iconify icon="cryptocurrency:btc"/>)
                    </Button>
                </CardContent>
          </Card>

          <Card  style={{marginTop:10}}>
              <CardHeader title="USDT RATE BOARD"/>
                  
                <CardContent>
                    <TextField fullWidth label="Set Buy USDT" id="fullWidth"  type="number"  value={usdtbuy || ''}  onChange={handleUsdtBuy}  />
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:microsoftauthenticator" /> } style={{marginTop:5,marginBottom:20}} disabled={usdtDisablebuy} onClick={()=>updateUsdtBuy()}>
                       Save Buy Rate (<Iconify icon="cryptocurrency:usdt"/>)
                    </Button>

                    <TextField fullWidth label="Set Sell USDT" id="fullWidth"  type="number" value={usdtsell || ''}  onChange={handleUsdtSell} />
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:microsoftauthenticator" /> } style={{marginTop:5}} disabled={usdtDisablesell} onClick={()=>updateUsdtSell()}>
                       Save Sell Rate (<Iconify icon="cryptocurrency:usdt"/>)
                    </Button>
                </CardContent>
          </Card>

          <Card  style={{marginTop:10}}>
              <CardHeader title="GIFTCARD RATE BOARD"/>
                  
                <CardContent>
                    <TextField fullWidth label="Set Buy GiftCard" id="fullWidth"  type="number"  value={giftcardbuy|| ''}  onChange={handleGiftcardBuy}  />
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:microsoftauthenticator" /> } style={{marginTop:5,marginBottom:20}} disabled={giftcardDisablebuy} onClick={()=>updateGiftcardBuy()}>
                       Save Buy Rate (<Iconify icon="ic:round-card-giftcard"/>)
                    </Button>

                    <TextField fullWidth label="Set Sell GiftCard" id="fullWidth"  type="number"  value={giftcardsell|| ''}  onChange={handleGiftcardSell}   />
                    <Button variant="outlined"  to="#" color="secondary" startIcon={<Iconify icon="arcticons:microsoftauthenticator" /> }  disabled={giftcardDisablesell}  style={{marginTop:5}} onClick={()=>updateGiftcardSell()}>
                       Save Sell Rate (<Iconify icon="ic:round-card-giftcard"/>)
                    </Button>
                </CardContent>
          </Card>

         
      
          </Grid>
      </Container>
    </Page>
  );
}

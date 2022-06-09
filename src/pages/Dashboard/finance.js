import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Navigate, useNavigate ,useOutletContext} from 'react-router-dom';
import Iconify from '../../components/Iconify';
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
} from '../../sections/@dashboard/app';

const Index =  ()=>{
    const navigate = useNavigate();
    const [data,setdata] = useState();
    const [refresh,setrefresh] = useState(false);
    const [userfetch,setuserfetch] = useState('');
    const [withdrawal,setwithdrawal] = useState('');
    const [deposit,setdeposit] = useState('');
    const [transaction,setransaction] = useState('');

    const Analyst = async ()=>{
        setrefresh(true)
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/all/for/card`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        }
      })
      .then((res)=>{
          setrefresh(false)
       console.log(res.data)
       setuserfetch(res.data.allusers.length);
       setdeposit(res.data.deposit.length)
       setwithdrawal(res.data.withdrawal.length)
       setransaction(res.data.transaction.length)
     
  
      })
      .catch((err)=>{
            console.log(err);
            setrefresh(false)
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
    
            //   Swal.fire({
            //     title: 'Message!',
            //     text: err.response.data,
            //     icon: 'error',
            //     confirmButtonText: 'ok'
            //   });
             
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
        Analyst();
    },[])

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {reactLocalStorage.getObject('admin').username}!, Welcome back
            </Typography>

            <Grid container spacing={3}>


            <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Transaction Count" total={refresh ? `refreshing` : transaction} icon={'ant-design:android-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Users" total={refresh ? `refreshing` : userfetch} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title=" Total Deposit" total={refresh ? `refreshing` : deposit} color="warning" icon={'ant-design:windows-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title=" Total Withdrawal" total={refresh ? `refreshing` : withdrawal} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                        title="Conversion Rates To Naira"
                        subheader="conversion rate"
                        chartData={[
                            { label: 'USD', value: 400 },
                            { label: 'EUR', value: 430 },
                            { label: 'GBP', value: 540 },
                            { label: 'AUD', value: 448 },
                            { label: 'CHF', value: 470 },
                            { label: 'CAD', value: 580 },
                        
                        ]}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <AppConversionRates
                        title="Transaction Volume"
                        subheader="monthly"
                        chartData={[
                            { label: 'JAN', value: 400 },
                            { label: 'FEB', value: 430 },
                            { label: 'MAR', value: 540 },
                            { label: 'APR', value: 448 },
                            { label: 'MAY', value: 470 },
                            { label: 'JUN', value: 580 },
                            { label: 'JUL', value: 580 },
                            { label: 'AUG', value: 580 },
                            { label: 'SEPT', value: 580 },
                            { label: 'OCT', value: 580 },
                            { label: 'NOV', value: 580 },
                            { label: 'DEC', value: 580 },
                        
                        ]}
                        />
                    </Grid>
            </Grid>
        </Container>
    )
}

export default Index;
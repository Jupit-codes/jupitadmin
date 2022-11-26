import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField,Stack,Typography,Select,InputLabel,MenuItem,Button,Grid,Container } from '@mui/material';
// components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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
  AppWidgetSummaryEdit,
  // AppCurrentSubject,
  // AppConversionRates,
} from '../sections/@dashboard/app';
// mock
import USERLIST from '../_mock/user';
import AwaitingApproval from './fetchpending'



// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TransactionCount() {
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [sendcount,setsendcount] = useState(0)
    const [receivecount,setreceivecount] = useState(0)
    const [sellcount,setsellcount] = useState(0)
    const [buycount,setbuycount] = useState(0)
    const [depositcount,setdepositcount] = useState(0)
    const [withdrawalcount,setwithdrawalcount] = useState(0)
    const [refresh,setrefresh] = useState(false)
    const [startdate,setstartdate] = useState()
    const [enddate,setdate] = useState()
    const [asset,setasset] = useState('BTC')
    const [testDate,setTestDate] = useState('')
    const navigate = useNavigate();
    

    const assetfetch = async (startdate,enddate)=>{
        setsellcount('refreshing')
        setbuycount('refreshing')
        setsendcount('refreshing')
        setreceivecount('refreshing')
        setdepositcount('refreshing')
        setwithdrawalcount('refreshing')
        setrefresh(true);
        console.log("startdatexxx",startdate);
        console.log("enddatexxxxx",enddate);
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/get/transaction/count`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        data:JSON.stringify({startdate,enddate,asset})
      })
      .then((res)=>{
       console.log(res.data)
            setrefresh(false)
            setbuycount(res.data.Buy)
            setsellcount(res.data.Sell)
            setsendcount(res.data.Send)
            setreceivecount(res.data.Receive)
            setdepositcount(res.data.Deposit)
            setwithdrawalcount(res.data.Withdrawal)
      })
      .catch((err)=>{
          
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
          console.log('err',err)
         
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

    const handleChange = (newValue,x) => {
     
        setstartdate(newValue);

      };
      const handleChangeEnd = (newValue) => {
        setdate(newValue);
        
      };
      const handleAsset = (e)=>{
        setasset(e.target.value)
      }

      useEffect(()=>{
        assetfetch(startdate,enddate);
      },[])

      const search = ()=>{
        assetfetch(startdate,enddate);
      }
      const reset = ()=>{
        setstartdate('');
        setdate('');
        assetfetch(startdate,enddate)
      }

  return (
    <Page title="TransactionCount">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            Transaction Count
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="clarity:export-line" />}>
            Test
          </Button> */}
        </Stack>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={4} direction="row" flexWrap="wrap" alignItems="center" justifyContent="flex-start" xs={12} sm={6} md={4} sx={{ mb: 5,mt:5 }}>
                                <Typography gutterBottom>
                                    <DesktopDatePicker
                                            label="Start Date"
                                            inputFormat="MM/dd/yyyy"
                                            sx={{ m: 2 }}
                                            value={startdate}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField {...params} />}
                                            
                                        />
                                </Typography>
                                <Typography gutterBottom >
                                    <DesktopDatePicker
                                            label="End Date"
                                            inputFormat="MM/dd/yyyy"
                                            sx={{ m: 1 }}
                                            value={enddate}
                                            onChange={handleChangeEnd}
                                            renderInput={(params) => <TextField {...params} />}
                                            
                                        />
                                </Typography> 
                                
                                <Typography  gutterBottom style={{marginTop:-15}}>
                                    <InputLabel id="demo-simple-select-label">Assets</InputLabel>
                                    <Select
                                        fullWidth
                                        id="demo-simple-select"
                                        sx={{ m: 1, width: '30ch' }}
                                        value={asset|| ''}
                                        onChange={handleAsset}
                                    >
                                        <MenuItem  value="BTC">BTC</MenuItem>
                                        <MenuItem  value="USDT">USDT</MenuItem>
                                       
                                    </Select>
                                </Typography>
                                <Typography variant="h4" gutterBottom>

                                <Button variant="outlined" size='large' onClick={()=>search()} disabled={refresh} >
                                    Search  
                                </Button>

                                <Button variant="outlined" size='large' onClick={()=>reset()} disabled={refresh} color="error" style={{marginLeft:5}} >
                                    Reset  
                                </Button>

                                </Typography>


                    </Stack>
 



            </LocalizationProvider>
        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total Count Buy" color="primary" total={buycount} icon={asset === "BTC" ?'cryptocurrency:btc':'cryptocurrency:usdt'}   refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total Count Sell"  color="warning" total={sellcount} icon={asset === "BTC" ?'cryptocurrency:btc':'cryptocurrency:usdt'}   refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total Count Send"  color="warning" total={sendcount} icon={asset === "BTC" ?'cryptocurrency:btc':'cryptocurrency:usdt'}   refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total Count Receive"  color="success" total={receivecount} icon={asset === "BTC" ?'cryptocurrency:btc':'cryptocurrency:usdt'}   refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total Count Deposit"  color="primary" total={depositcount}icon={'tabler:currency-naira'}   refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total Count Withdrawal"  color="warning" total={withdrawalcount} icon={'tabler:currency-naira'}  refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
            </Grid>
            
            
        </Grid>

        
      </Container>
    </Page>
  );
}

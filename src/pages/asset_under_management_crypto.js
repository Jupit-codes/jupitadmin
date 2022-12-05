import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import moment from 'moment';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
// material
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField,Stack,Typography,Select,InputLabel,MenuItem,Button,Grid,Container } from '@mui/material';
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

export default function Assetundermanagementcrypto() {
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [btcbalance,setbtcbalance] = useState(0)
    const [usdtbalance,setusdtbalance] = useState(0)
    const [refresh,setrefresh] = useState(false)
    const todayNew = moment().startOf('day');
    const [startdate,setstartdate] = useState(moment().startOf('day'))
    const [enddate,setdate] = useState(moment(todayNew).endOf('day'))
    const navigate = useNavigate();

    useEffect(()=>{
      const today = moment();
      const now = today.format()
      const start = moment(now).startOf('day');
      const end = moment(start).startOf('day');
      
      assetfetch(start,end);
    },[])
    
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = DATA.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DATA.length) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const filteredUsers = applySortFilter(DATA, getComparator(order, orderBy), filterName);
  const isUserNotFound = filteredUsers.length === 0;

    const assetfetch = async (startdate,enddate)=>{
      // console.log(startdate,enddate)
        setbtcbalance('refreshing')
        setusdtbalance('refreshing')
        setrefresh(true);
      
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/get/cryptoasset/set`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        data:JSON.stringify({startdate,enddate})
      })
      .then((res)=>{
       console.log(res.data)
       setrefresh(false)
       setbtcbalance(res.data.BTC_BALANCE);
       setusdtbalance(res.data.USDT_BALANCE);
      
  
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

    const handleChange = (newValue) => {
        setstartdate(newValue);
      };
      const handleChangeEnd = (newValue) => {
        setdate(newValue);
        
      };

      

      const search = ()=>{
        const start = moment().startOf('day');
        const end = moment(start).endOf('day')
        assetfetch(startdate,enddate);
      }
      const reset = ()=>{
        setstartdate('');
        setdate('');
        const start = moment().startOf('day');
        const end = moment(start).endOf('day')
        assetfetch(startdate,enddate)
      }

  return (
    <Page title="Asset Under Management Crypto">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            Asset Under Management Crypto
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="clarity:export-line" />}>
            Test
          </Button> */}
        </Stack>
        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total BTC" color="warning" total={btcbalance} icon={'cryptocurrency:btc'}   refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummaryEdit title="Total USDT"  color="success" total={usdtbalance} icon={'cryptocurrency:usdt'}  refreshPage={setrefresh} refresh={refresh}/>
                    </Grid>
            </Grid>
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
            
        </Grid>

        
      </Container>
    </Page>
  );
}

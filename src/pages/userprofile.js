import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
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
  getAccordionSummaryUtilityClass
} from '@mui/material';
// components
import BiggerLoader from '../utils/loader'
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
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

const TABLE_HEAD = [
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phonenumber', label: 'Phonenumber', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

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

  const [DATA,setDATA] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [btcmarketprice,setbtcmarketprice] = useState(0);
  const [btcmarketpricedisplay,setbtcmarketpricedisplay] = useState('');

  const [usdtmarketprice,setusdtmarketprice] = useState(0);
  const [usdtmarketpricedisplay,setusdtmarketpricedisplay] = useState('');

  const [marketdata,setmarketdata] = useState([])

  const [jupitbtcbuyrate,setjupitbtcbuyrate] = useState(0);
  const [jupitusdtbuyrate,setjupitusdtbuyrate] = useState(0);

  const [refresh,setrefresh] = useState()

  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
    //   console.log(res.data)
      setjupitbtcbuyrate(res.data.rate[0].btc[0].buy);
      setjupitusdtbuyrate(res.data.rate[0].usdt[1].buy);
      setbtcbalance(res.data.detail.btc_wallet[0].balance.$numberDecimal);
      setusdtbalance(res.data.detail.usdt_wallet[0].balance.$numberDecimal);
      setnairabalance(res.data.detail.naira_wallet[0].balance.$numberDecimal);
      setusername(res.data.detail.username);
      setemail(res.data.detail.email);
      setphonenumber(res.data.detail.phonenumber);
      setdoc(res.data.detail.updated);
      setbank(res.data.bank.bank_code);
      setaccountnumber(res.data.bank.account_number)
        settwofactor(res.data.twofactor);
      setbigLoader(false);

      

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

  
    const marketprice = ()=>{
        axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,USDT&tsyms=USD',{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Apikey 475906935b55657e131801270facf7cd73a797ee9cff36bbb24185f751c18d63'
        }
    })
    .then(res=>{
   
    setmarketdata(res.data)
    setbtcmarketprice(res.data.RAW.BTC.USD.PRICE);
    setbtcmarketpricedisplay(res.data.DISPLAY.BTC.USD.PRICE)
    setusdtmarketprice(res.data.RAW.USDT.USD.PRICE);
    setusdtmarketpricedisplay(res.data.DISPLAY.USDT.USD.PRICE)
    
    })
    .catch(err=>{
    console.log(err)
    })
    }

    

    useEffect(()=>{
        setbigLoader(true);
        getAllUserDetails();
        

    },[refresh])

    useEffect(()=>{
        marketprice();
    },[marketdata])

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

  return (
    <Page title="UserProfile">
        {bigloader && <BiggerLoader/>}
      <Container>

      <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummaryEdit title="BTC Wallet Balance" color="warning" total={btcbalance} icon={'cryptocurrency:btc'} edit={'bx:edit'} userid={id} livemarket={btcmarketpricedisplay} livemarketdata={btcmarketprice} jupitrate={jupitbtcbuyrate}  refreshPage={setrefresh} refresh={refresh}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummaryEdit title="USDT Wallet Balance"  color="success" total={usdtbalance} icon={'cryptocurrency:usdt'} edit={'bx:edit'} userid={id}  livemarket={usdtmarketpricedisplay} livemarketdata={usdtmarketprice} jupitrate={jupitusdtbuyrate} refreshPage={setrefresh}  refresh={refresh}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummaryEdit title="Naira Wallet Balance" total={nairabalance} icon={'tabler:currency-naira'} edit={'bx:edit'} userid={id} refreshPage={setrefresh}  refresh={refresh}/>
            </Grid>


            <Grid item xs={12} md={6} lg={8}>
                <Card style={{padding:20}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h4" gutterBottom mb={5}>
                        User Profile Details<Iconify icon="eva:edit-2-fill"/>
                    </Typography>
                    <Typography variant="h4" gutterBottom mb={5}>

                    <Button variant="outlined" component={RouterLink} to="#" color="error" startIcon={<Iconify icon="arcticons:microsoftauthenticator" />}>
                        {twofactor && twofactor.activated && 'Disable 2FA'}
                        {!twofactor && 'Not Activated'}
                    </Button>
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
                
                </Card>
                
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
          <AppOrderTimeline
              title="KYC (Know Your Client) LEVEL"
              list={[...Array(3)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'KYC LEVEL 1',
                  'KYC LEVEL 2',
                  'KYC LEVEL 3'
                 
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>

        

        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
            <Card>
            {loader && <div className='myloader'>loading data...</div>}
            {!loader && 
                <>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={DATA.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        { DATA && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, username, email, phonenumber, status, avatarUrl, isVerified,_id } = row;
                        const isItemSelected = selected.indexOf(username) !== -1;
    
                        return (
                            <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, username)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={username} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                    {username}
                                </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phonenumber}</TableCell>
                            <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="left">
                                <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                {sentenceCase(status)}
                                </Label>
                            </TableCell>
    
                            <TableCell align="right">
                                
                                <UserMoreMenu userid={_id} />
                            </TableCell>
                            </TableRow>
                        );
                        })}
                        {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                        )}
                    </TableBody>
    
                    {isUserNotFound && (
                        <TableBody>
                        <TableRow>
                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    )}
                    </Table>
                </TableContainer>
                </Scrollbar>
    
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={DATA.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            
            
            </>
            }
            
            </Card>
          </Grid>


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="clarity:export-line" />}>
            Export To Excel
          </Button>
        </Stack>

        
      </Container>
    </Page>
  );
}

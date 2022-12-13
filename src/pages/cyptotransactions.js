import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
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
  import { sentenceCase } from 'change-case';
  import { filter } from 'lodash';
  import axios from 'axios'
  import { reactLocalStorage } from 'reactjs-localstorage';
  import { useNavigate } from "react-router-dom";
  import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
  import {
  
    AppWebsiteVisits,
    AppWidgetSummary,
    AppWidgetSummaryEdit,
  
  } from '../sections/@dashboard/app';
  import SearchNotFound from '../components/SearchNotFound';
  import Label from '../components/Label';
  import Scrollbar from '../components/Scrollbar';
  import Filter from './cryptofilter'


  
const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'userid', label: 'Userid', alignRight: false },
    { id: 'from_address', label: 'Address', alignRight: false },
    { id: 'amount', label: 'Amount', alignRight: false },
    
    { id: 'currency', label: 'Currency', alignRight: false },
    { id: 'transaction_fee', label: 'Transaction Fee', alignRight: false },
    { id: 'type', label: 'Type', alignRight: false },
    { id: 'status', label: 'status', alignRight: false },
    { id: 'updated', label: 'Date', alignRight: false },
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
      return filter(array, (_user) => _user.type.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

export default function Transaction({handleData}){
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(500);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const [btcnew,setbtcnew]= useState(0)
    const [usdt,setusdt]= useState(0)
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
    const getTransactionData = async (isMounted)=>{
      if (isMounted){
          setLoader(true)
          const BaseUrl = process.env.REACT_APP_ADMIN_URL  
          await axios({
      
          url:`${BaseUrl}/admin/get/all/cryptoledger`,
          method:'GET',
          headers:{
            'Content-Type':'application/json',  
            'Authorization': reactLocalStorage.get('token')
          },
          
        })
        .then((res)=>{
      //    console.log(res.data)
      console.log(res)
          setLoader(false)
          setDATA(res.data.data)
          setbtcnew(res.data.sumTotalBTC)
          setusdt(res.data.sumTotalUSDT)
    
          
    
        })
        .catch((err)=>{
            
              console.log("Error",err);
              setLoader(false)
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
              
              
        })
      }
        
    }

    useEffect(()=>{
      let isMounted = true
        setTimeout(()=>{getTransactionData(isMounted)},2000)

        return () => {
          isMounted = false;
          };
    },[])

    return (
        
        <>
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4}>
                        <AppWidgetSummaryEdit title="Total BTC Transaction Fee" color="warning" total={btcnew} icon={'cryptocurrency:btc'}  />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <AppWidgetSummaryEdit title="Total BTC Position" color="warning" total={btcnew} icon={'cryptocurrency:btc'}  />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <AppWidgetSummaryEdit title="Total USDT Transaction Fee"  color="success" total={usdt} icon={'cryptocurrency:usdt'}  />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <AppWidgetSummaryEdit title="Total USDT Position"  color="success" total={usdt} icon={'cryptocurrency:usdt'}  />
                    </Grid>
            </Grid>
            <Filter filteredData={setDATA} xhandle={handleData}  mysetloader={setLoader}/>
            <Card>
            {loader && <div className='myloader'>loading data...</div>}
            {!loader && 
                <>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }} >
                    <Table >
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
                        const { _id,userid,address, status, type, currency,updated,transaction_fee,amount } = row;
                        const isItemSelected = selected.indexOf(userid) !== -1;
    
                        return (
                            <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, userid)} />
                            </TableCell>
                            
                            <TableCell align="left">{_id}</TableCell>
                            <TableCell align="left">{userid}</TableCell>
                            <TableCell align="left">{address}</TableCell>
                            <TableCell align="left">{amount}</TableCell>
                            
                            <TableCell align="left">{currency}</TableCell>
                            <TableCell align="left">{transaction_fee}</TableCell>
                            <TableCell align="left">
                                <Label variant="ghost" color={(type === 'Debit' && 'error') || 'success'}>
                                {type}
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                {status}
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                {updated}
                            </TableCell>
                            {/* <TableCell align="right">
                                
                                <UserMoreMenu userid={_id} />
                            </TableCell> */}
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
                rowsPerPageOptions={[500, 1000, 2000]}
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
        
        
        </>
    )
}

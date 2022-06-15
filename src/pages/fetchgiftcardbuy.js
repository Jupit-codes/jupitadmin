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
  import Iconify from '../components/Iconify';
  import { UserListHead, UserListToolbar,UserMore,GiftCardMore } from '../sections/@dashboard/user';

  import SearchNotFound from '../components/SearchNotFound';
  import Label from '../components/Label';
  import Scrollbar from '../components/Scrollbar';


  
const TABLE_HEAD = [
    { id: 'Id', label: 'Id', alignRight: false },
    { id: 'Userid', label: 'Userid', alignRight: false },
    {id:'GiftCard',label:'GiftCard',alignRight:false},
    { id: 'Country', label: 'Country', alignRight: false },
    { id: 'Total', label: 'Total(USD)', alignRight: false },
    { id: 'Total', label: 'Total(Naira)', alignRight: false },
    { id: 'Status', label: 'Status', alignRight: false },
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
      return filter(array, (_user) => _user.country.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

export default function FetchGiftCardSell({userid}){
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selected, setSelected] = useState([]);
    const [failedRequest,setFailedRequest] = useState(false)
    const navigate = useNavigate()
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

    const getTransactionData = async ()=>{
        setLoader(true)
        setFailedRequest(false);
    const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/fetch/giftcard/buy`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        
      })
      .then((res)=>{
    //    console.log(res.data)
        setLoader(false)
        setDATA(res.data.message)

      })
      .catch((err)=>{
          
            console.log(err);
            setLoader(false);
            setFailedRequest(true);
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
        getTransactionData();
    },[])

    return (
        
        <>
            <Card>
            {loader && <div className='myloader'>loading data...</div>}
            {!loader && failedRequest && <div className='myloader'><small>Verification Failed...Click Below to Reload</small><Iconify icon="icon-park-twotone:reload" width="48px" height="48px" onClick={()=>{getTransactionData()}}/></div>}
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
                        const {_id,country,userid,unique_id,updated,total,status,cardname,amount_in_usd } = row;
                        const isItemSelected = selected.indexOf(country) !== -1;
    
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
                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, country)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                {/* <Avatar alt={username} src={avatarUrl} /> */}
                                <Typography variant="subtitle2" noWrap>
                                    {_id}
                                </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="left">{userid}</TableCell>
                            <TableCell align="left">{cardname}</TableCell>
                            <TableCell align="left">{country}</TableCell>
                            <TableCell align="left">{amount_in_usd}</TableCell>
                            <TableCell align="left">{total}</TableCell>
                            <TableCell align="left">
                                <Label variant="ghost" >
                                {status}
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                {updated}
                            </TableCell>
                            <TableCell align="right">
                                {/* <UserMore userid={userid}  unique_id={unique_id} data={DATA}/> */}
                                <GiftCardMore userid={userid} unique_id={unique_id} data={DATA}/>
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
        
        
        </>
    )
}

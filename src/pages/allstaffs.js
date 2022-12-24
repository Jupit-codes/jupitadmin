import { useEffect, useState } from "react";

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
  import Swal from "sweetalert2";
  import { reactLocalStorage } from 'reactjs-localstorage';
  import { useNavigate } from "react-router-dom";
  import PleaseWait from '../utils/modal/Pleasewait'
  import { UserListHead, UserListToolbar, UserMoreMenu,StaffMore } from '../sections/@dashboard/user';
  import SearchNotFound from '../components/SearchNotFound';
  import Label from '../components/Label';
  import Scrollbar from '../components/Scrollbar';
  
const TABLE_HEAD = [
    { id: 'username', label: 'Username', alignRight: false },
    { id: 'firstname', label: 'Firstname', alignRight: false },
    { id: 'lastname', label: 'Lastname', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'status', label: 'status', alignRight: false },
    { id: 'updated', label: 'Created_at', alignRight: false },
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

export default function Transaction({reload}){
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('username');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(500);
    const [selected, setSelected] = useState([]);
    const [reloadStaff,setreloadStaff] = useState(false);
    const [pleasewait,setpleasewait] = useState(false)
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
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/all/staff`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        }
      })
      .then((res)=>{
       console.log(res.data)
       setreloadStaff(false)
       setLoader(false);
       setDATA(res.data)
  
      })
      .catch((err)=>{
            setreloadStaff(false)
            setLoader(false);
            
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
        getTransactionData()
    },[])

    useEffect(()=>{
        console.log(reload)
        if(!reload){
            getTransactionData()
        }
        if(reloadStaff){
            getTransactionData()
        }
    },[reload,reloadStaff])

    return (
        
        <>
            <Card>
            {loader && <div className='myloader'>loading data...</div>}
            {pleasewait && <PleaseWait open={pleasewait} close={setpleasewait}/> }
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
                        const {_id,username,status,firstname,lastname,email,role,updated } = row;
                        const isItemSelected = selected.indexOf(username) !== -1;
    
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
                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, username)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={username} src="" />
                                <Typography variant="subtitle2" noWrap>
                                    {username}
                                </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="left">{firstname}</TableCell>
                            <TableCell align="left">{lastname}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{role}</TableCell>
                           
                            <TableCell align="left">
                                <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                {(status)}
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                {updated}
                            </TableCell>
                            <TableCell align="right">
                                
                                <StaffMore userid={_id} update={setreloadStaff} loader = {setpleasewait} status={status} staffusername={username} rolename={role} />
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
                rowsPerPageOptions={[500, 1000, 1500]}
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

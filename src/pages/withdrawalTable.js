import { useEffect, useState ,createRef} from "react";
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
  import Pdf from "react-to-pdf";
 
  import { reactLocalStorage } from 'reactjs-localstorage';
  import { useNavigate } from "react-router-dom";
  import Filter from './filterwithdrawal'
  import { UserListHead, UserListToolbar,UserMore } from '../sections/@dashboard/user';
  
  
  import SearchNotFound from '../components/SearchNotFound';
  import Label from '../components/Label';
  import Scrollbar from '../components/Scrollbar';


  
const TABLE_HEAD = [
    { id: 'Userid', label: 'Userid', alignRight: false },
    { id: 'Email', label: 'Email', alignRight: false },
    { id: 'Account Number', label: 'Account Number', alignRight: false },
    { id: 'Account Name', label: 'Account Name', alignRight: false },
    { id: 'Bank', label: 'Bank Code', alignRight: false },
    { id: 'Amount', label: 'Amount', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
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
      return filter(array, (_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

export default function WithdrawalTable({handleData}){
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate()
    
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const ref = createRef();

     
const bankCode = [
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

  const getBank = (bankcode)=>{

    return bankCode.map((d,index)=>{
     
      if(d.code === bankcode.toString()){
        console.log('name',d.name)
        return d.name
      }
      return true
    
    })
    
  }

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
    
        url:`${BaseUrl}/admin/all/withdrawal`,
        method:'GET',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        
      })
      .then((res)=>{
       console.log(res.data)
        setLoader(false)
        setDATA(res.data)
  
        
  
      })
      .catch((err)=>{
          
            
            setLoader('pls try again');
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

    return (
        
        <>
          <Filter filteredData={setDATA} xhandle={handleData}  mysetloader={setLoader}/>
            <Card>
              {/* <Pdf targetRef={ref} filename="withdrawal">
                {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf> */}
            {loader && <div className='myloader'>loading data...</div>}
            {!loader && 
                <>
                <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }} >
                    <Table  >
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
                        const {_id,amount,email,userid,account_name,account_number,bank_code,updated } = row;
                        const isItemSelected = selected.indexOf(email) !== -1;
    
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
                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, _id)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={email} src="" />
                                <Typography variant="subtitle2" noWrap>
                                    {userid}
                                </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{account_number}</TableCell>
                            <TableCell align="left">{account_name}</TableCell>
                            <TableCell align="left">{getBank(bank_code)}</TableCell>
                            <TableCell align="left">{amount.toLocaleString('en-US')}</TableCell>
                    
                            <TableCell align="left">
                                <Label variant="ghost" color='success'>
                                {sentenceCase("Successful")}
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                {updated}
                            </TableCell>
                            <TableCell align="right">
                                <UserMore userid={userid}  _id={_id} data={DATA}/>
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

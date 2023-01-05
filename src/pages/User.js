import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CSVLink } from "react-csv";
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate,useOutletContext } from 'react-router-dom';
// material
import {
  Card,
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
  Grid
} from '@mui/material';
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
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);
  const [refreshing,setrefreshing] = useState(false)


 const [appstate] = useOutletContext();



  const [DATA,setDATA] = useState([]);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(500);
  const [failedRequest,setfailedRequest] = useState(false)

  const getAllUsers =  ()=>{
    const BaseUrl = process.env.REACT_APP_ADMIN_URL;
    setrefreshing(true)
    setfailedRequest(false)
     axios({
      url:`${BaseUrl}/admin/get/all/users`,
      method:'GET',
      headers:{
        'Content-Type':'application/json',  
        'Authorization':reactLocalStorage.get('token')
      },
    })
    .then((res)=>{
      setrefreshing(false)
      console.log(res.data.message)
      setDATA(res.data.message);
      setLoader(false)
    })
    .catch((err)=>{
      setrefreshing(false)
      setfailedRequest(true)
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
    getAllUsers();
    
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
  
  return (
    <Page title="User">
      <Container>

        <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title={refreshing ? 'Refreshing Data' : 'Total Users'} total={DATA.length} icon={'bx:group'} />
            
            {failedRequest && <div className='myloader'><small>Verification Failed...Click Below to Reload</small><Iconify icon="icon-park-twotone:reload" width="48px" height="48px" onClick={()=>{getAllUsers()}}/></div>}
        </Grid>

        {/* <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
            <AppWebsiteVisits
              title="User Onboarding"
              subheader="Monthly basis"
              chartLabels={[
                '01/01/2022',
                '02/01/2022',
                '03/01/2022',
                '04/01/2022',
                '05/01/2022',
                '06/01/2022',
                '07/01/2022',
                '08/01/2022',
                '09/01/2022',
                '10/01/2022',
                '11/01/2022',
              ]}
              chartData={[
                {
                  name: 'User',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                
              ]}
            />
          </Grid> */}


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          
          <CSVLink data={DATA}>
            <Button variant="contained" startIcon={<Iconify icon="clarity:export-line" />}>
              Export To Excel
            </Button>
          </CSVLink>
        </Stack>

        <Card>
          {loader && <div className='myloader'>loading data...</div>}
          {failedRequest && <div className='myloader'><small>Verification Failed...Click Below to Reload</small><Iconify icon="icon-park-twotone:reload" width="48px" height="48px" onClick={()=>{getAllUsers()}}/></div>}
          {!loader && DATA &&
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
                       const { id, username, email, phonenumber, Status, avatarUrl,_id } = row;
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
                               <Avatar alt={username} src={avatarUrl} />
                               <Typography variant="subtitle2" noWrap>
                                 {username}
                               </Typography>
                             </Stack>
                           </TableCell>
                           <TableCell align="left">{email}</TableCell>
                           <TableCell align="left">{phonenumber}</TableCell>
                           <TableCell align="left">{Status}</TableCell>
                           <TableCell align="left">
                             <Label variant="ghost" color={(Status === 'banned' && 'error') || 'success'}>
                               {Status}
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
      </Container>
    </Page>
  );
}

import { filter } from 'lodash';
import '../App.css'
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Link as RouterLink, Navigate,useNavigate } from 'react-router-dom';
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
import GiftCardSell from './fetchgiftcardsell'



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

export default function Alltransaction() {
    const [loader,setLoader] = useState(false);
    const [DATA,setDATA] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
    
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
    <Page title="GiftCard Sell">
      <Container>


        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            GiftCard Sell Portal
          </Typography>
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="clarity:export-line" />}>
            Test
          </Button> */}
        </Stack>
        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
           
            <GiftCardSell/>

        </Grid>

        
      </Container>
    </Page>
  );
}

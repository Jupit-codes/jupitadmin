
import '../App.css'

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
import Iconify from '../components/Iconify';


import UserTransaction from './user_transaction'
import AllStaff from './allstaffs'
import StaffCreationModal from '../utils/staffcreationmodal'

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



export default function Staff() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [modal,setmodal] = useState(false)

  const [DATA,setDATA] = useState([]);

 




  return (
    <Page title="Staff Management">
        
        {modal && <StaffCreationModal closeModal={setmodal} modify={modal} />}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
          <Typography variant="h4" gutterBottom>
            Staff Portal
          </Typography>
          <Button variant="contained" component={RouterLink} onClick={(e)=>{ e.preventDefault();setmodal(true)}} to="#" startIcon={<Iconify icon="clarity:export-line" />}>
            Add New Staff
          </Button>
        </Stack>
      
      

        <Grid item xs={12} md={6} lg={8} sx={{mt:"2rem"}}>
            <AllStaff  reload={modal} />
          </Grid>

      </Container>
    </Page>
  );
}

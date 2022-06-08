import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Navigate, useNavigate ,useOutletContext} from 'react-router-dom';
import IdleStateLoader from '../utils/Reauthorization'
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

import SuperAdminDashboard from './Dashboard/superadmin'
import OperationManagerDashboard from './Dashboard/operationmanager'




// ----------------------------------------------------------------------

export default function DashboardApp(state) {
  
  const theme = useTheme();
  const navigate = useNavigate()
  const [IdleState,setIdleState] = useState(false)
  const [dashboard,setdashboard] = useState('')
  console.log(state)

  const renderComponent = ()=>{
    switch (reactLocalStorage.getObject('admin').roleid){
      case 1:
        return <SuperAdminDashboard/>
        
      case 2:
        return <OperationManagerDashboard/>
        
      default:

    }
  }


  
  
  return (
    <Page title="Dashboard">
     
      {renderComponent()}
    </Page>
  );
}

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
import FinanceDashboard from './Dashboard/finance'
import Giftcardagent from './Dashboard/giftcardagent'
import Customercare from './Dashboard/customercare'
import QualityAssurance from './Dashboard/qualityassurance'



// ----------------------------------------------------------------------

export default function DashboardApp(state) {
  
  const theme = useTheme();
  const navigate = useNavigate()
  const [IdleState,setIdleState] = useState(false)
  const [dashboard,setdashboard] = useState('')
  console.log(state)

  const renderComponent = ()=>{
    console.log('roleid',reactLocalStorage.getObject('admin').roleid)
    switch (reactLocalStorage.getObject('admin').role){
      case "Super Admin":
        return <SuperAdminDashboard/>
      case "Operations Manager":
        return <OperationManagerDashboard/>
      case "Finance Officer":
        return <FinanceDashboard/>
      case "Quality Assurance ":
        return <QualityAssurance/>
      case "Customer Service":
        return <Customercare/>
      case 6:
          return <Giftcardagent/>
      default:

    }
  }


  
  
  return (
    <Page title="Dashboard">
     
      {renderComponent()}
    </Page>
  );
}

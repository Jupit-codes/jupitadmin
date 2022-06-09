import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Navigate, useNavigate ,useOutletContext} from 'react-router-dom';
import Iconify from '../../components/Iconify';
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
} from '../../sections/@dashboard/app';
import { reactLocalStorage } from 'reactjs-localstorage';
const Index = ()=>{

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {reactLocalStorage.getObject('admin').username}!, Welcome back
            </Typography>
        </Container>
    )
}

export default Index;
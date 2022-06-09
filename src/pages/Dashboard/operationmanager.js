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

const Index = ()=>{

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {reactLocalStorage.getObject('admin').username}!, Welcome back
            </Typography>

            <Grid container spacing={3}>


            <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title=" Total Deposit" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title=" Total Withdrawal" total={234} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                        title="Conversion Rates To Naira"
                        subheader="conversion rate"
                        chartData={[
                            { label: 'USD', value: 400 },
                            { label: 'EUR', value: 430 },
                            { label: 'GBP', value: 540 },
                            { label: 'AUD', value: 448 },
                            { label: 'CHF', value: 470 },
                            { label: 'CAD', value: 580 },
                        
                        ]}
                        />
                    </Grid>
            </Grid>
        </Container>
    )
}

export default Index;
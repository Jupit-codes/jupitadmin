import {
    Card,
    CardContent,
    CardHeader,

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
  import Iconify from '../../components/Iconify';

const Index=({closeModal,modifyIdle})=>{
    return (<div className="Overlay">
          <Avatar alt="staff-profile" src="" sx={{ width: 80, height: 80,marginBottom:3 }} />
          <Grid item xs={12} md={6} lg={8}>
            <Card   style={{marginTop:10}}>
                <CardHeader title="Login"/>
                    
                    <CardContent>
                        <TextField fullWidth label="Password" id="fullWidth"  type="password"  />
                        <Button variant="outlined"  to="#" color="secondary" onClick={()=>{closeModal(false); modifyIdle(false)}} startIcon={<Iconify icon="entypo:login"/> } style={{marginTop:5,marginBottom:20}} >
                            Login 
                        </Button>

                     
                    </CardContent>
            </Card>
          </Grid>
    </div>)
}

export default Index;
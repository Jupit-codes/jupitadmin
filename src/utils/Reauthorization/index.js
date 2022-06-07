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
    import { useEffect, useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { reactLocalStorage } from 'reactjs-localstorage';
    import Swal from 'sweetalert2';
    import axios from 'axios';
    import Iconify from '../../components/Iconify';
import PleaseWaitModal from '../modal/Pleasewait';

const Index = ({closeModal,modifyIdle})=>{
    const [password,setpassword] = useState('');
    const [btn,setbtn] = useState('Login');
    const [DisableBtn, setDisableBtn] = useState(false)
    const navigate = useNavigate()
    const loginChecker = async ()=>{
        setbtn("Please Wait...")
        setDisableBtn(true)
        
        const BaseUrl = process.env.REACT_APP_ADMIN_URL;
        
        await axios({
        url:`${BaseUrl}/admin/checklogin`,
        method:'POST',
        headers:{
            'Content-Type':'application/json',  
            
        },
        data:JSON.stringify({username:reactLocalStorage.getObject('admin').username,password})
        })
        .then((res)=>{
        console.log(res.data)
            closeModal(false);
             modifyIdle(false)

        })
        .catch((err)=>{
        
            setbtn('Login');
            setDisableBtn(false)
            if(err.response){
                if(err.response.status === 403){
            
                Swal.fire({
                    title: 'Message!',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                
                return false;
                
                }
                console.log(err)
            }
            else{
                console.log(err)
            }
        
        
        })

}

    const handleChange = (e)=>{
        setpassword(e.target.value)
    }


    useEffect(()=>{

        reactLocalStorage.remove('token');
    
    },[])
    return (<div className="Overlay">
          <Avatar alt="staff-profile" src="" sx={{ width: 80, height: 80,marginBottom:3 }} />
          <Grid item xs={12} md={6} lg={8}>
            <Card   style={{marginTop:10}}>
                <CardHeader title="Login"/>
                    
                    <CardContent>
                        <TextField fullWidth label="Password" id="fullWidth"  type="password" value={password || ''} onChange={()=>{handleChange()}}  />
                        <Button variant="outlined"  to="#" color="secondary" onClick={()=>{loginChecker()}} startIcon={<Iconify icon="entypo:login"/> }  disabled={DisableBtn} style={{marginTop:5,marginBottom:20}} >
                            {btn} 
                        </Button>

                     
                    </CardContent>
            </Card>
          </Grid>
    </div>)
}

export default Index;
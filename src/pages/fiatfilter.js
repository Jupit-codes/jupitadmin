import { TextField,Stack,Typography,Select,InputLabel,MenuItem,Button } from '@mui/material';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CSVLink } from "react-csv";

const Index = ({filteredData,xhandle,mysetloader})=>{
    const navigate = useNavigate();
    const [startdate,setstartdate] = useState();
    const [status,setstatus] = useState();
    const [asset,setasset] = useState();
    const [userid,setuserid] = useState();
    const [enddate,setenddate] = useState();
    const [amount,setamount] = useState();
    const [type,settype] = useState();

    const handleStatus = (e)=>{
        setstatus(e.target.value)
    }
    const handleChange = (newValue) => {
        setstartdate(newValue);
      };
      const handleChangeEnd = (newValue) => {
        setenddate(newValue);
      };
      const handleAsset = (e) => {
        setasset(e.target.value);
      };
      const handleUserid = (e) => {
        setuserid(e.target.value);
      };

      const handleType = (e)=>{
          settype(e.target.value)
      }

      const handleReset = ()=>{
          setstartdate('');
          setenddate('');
          setstatus('');
          settype('');
          setasset('')
          setuserid('')

          search();

      }
      const search = async ()=>{
        mysetloader(true)
        const BaseUrl = process.env.REACT_APP_ADMIN_URL;
   
            await axios({
            url:`${BaseUrl}/verify/filterfiatledger`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',  
                'Authorization':reactLocalStorage.get('token')
            },
            data:JSON.stringify({startdate,enddate,asset})
            })
            .then((res)=>{
                // console.log(res.data);
                mysetloader(false)
                filteredData(res.data);
                xhandle(res.data)
           
            })
            .catch((err)=>{
                console.log(err)
            if(err.response){
                if(err.response.status === 403){
                console.log(err.response.data.message);
                Swal.fire({
                    title: 'Message!',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'ok'
                });
                navigate('/login',{replace:true})
                return false;
                
                }
                
                    toast.error(err.response.data,'Failed Callback');
            
                console.log(err)
            }
            else{
                console.log(err)
            }
            
            

            })

      }



    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            
           <Stack spacing={4} direction="row" flexWrap="wrap" alignItems="center" justifyContent="flex-start" xs={12} sm={6} md={4} sx={{ mb: 5 }}>
                   
                   
                    <Typography gutterBottom>
                        <DesktopDatePicker
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            sx={{ m: 2 }}
                            value={startdate}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            
                        />
                    </Typography>
                    <Typography gutterBottom >
                        <DesktopDatePicker
                            label="End Date"
                            inputFormat="MM/dd/yyyy"
                            value={enddate}
                            sx={{ m: 1 }}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField {...params} />}
                            
                        />
                    </Typography>

                    <Typography variant="h4" gutterBottom>

                    <Button variant="outlined" size='large' onClick={()=>search()} >
                        Search  
                    </Button>

                </Typography>
                <Typography variant="h4" gutterBottom>
                    <Button variant="outlined" onClick={()=>handleReset()} size='large' color="error" style={{marginLeft:5}}>
                        Reset 
                    </Button>
                </Typography>

                        
            </Stack>

            
            {/* <Stack direction='row' flexWrap="wrap" alignItems="center" justifyContent="center">
                
            </Stack> */}
          </LocalizationProvider>
    )
}

export default Index;
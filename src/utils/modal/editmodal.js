import * as React from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import { setNestedObjectValues } from 'formik';
import Iconify from '../../components/Iconify'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function BasicModal({statemodal,modifyOpen,modalTitle,userid,marketrate,jupitrate,page,pagerefresh}) {
  const [open, setOpen] = React.useState(false);
  const [disablebtn,setdisablebtn] = React.useState(false)
  const [value, setValue] = React.useState(0);
  const [usdvalue, setusdvalue] = React.useState('');
  const [nairavalue, setnairavalue] = React.useState('');
  const [solevalue,setsolevalue] = React.useState('')
  const handleClose = () => modifyOpen(!statemodal);
  const BaseUrl = process.env.REACT_APP_ADMIN_URL
  const handleCreditWallet = async ()=>{
   
   setdisablebtn(true)
   let valuex;
   let usdvaluex;
   let nairavaluex;
   if (value.toString().indexOf(',') > -1) { 
      valuex = value.replace(/\D/g, '');
    }
    else{
        valuex=value
    }

    if (usdvalue.toString().indexOf(',') > -1) { 
      usdvaluex = usdvalue.replace(/\D/g, '');
    }
    else{
      usdvaluex=usdvalue
    }

    if (nairavalue.toString().indexOf(',') > -1) { 
      nairavaluex = nairavalue.replace(/\D/g, '');
    }
    else{
      nairavaluex=nairavalue
    }


    await axios({
      url:`${BaseUrl}/admin/manual/wallet/credit`,
      method:"POST",
      headers:{
        "Content-type":'application/json',
        "Authorization":reactLocalStorage.get('token')
      },
      data:JSON.stringify({valuex,nairavaluex,usdvaluex,modalTitle,userid,marketrate,jupitrate})

    })
    .then((res)=>{
     
      if(res.data.status){
        setdisablebtn(false);
        Swal.fire({
          title: 'Message!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        
        page(!pagerefresh)
        modifyOpen(!statemodal)
        
      }

    })
    .catch((err)=>{
      console.log("errorx",err.response);
    })
  }

  // const handeChange= (e)=>{
  //   setsolevalue(e.target.value)
  // }
  const handeChangeNaira=(e)=>{
    if(parseFloat(marketrate)){
      const {value} = e.target
      if(value) {
        const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
        setnairavalue(formattedValue)
        const newjupitrate = parseFloat(jupitrate);
        const newmarketrate = parseFloat(marketrate);
        const usdequi = parseFloat(value.replace(/,/g, '')) / newjupitrate
        const btcequi = parseFloat(usdequi/newmarketrate).toFixed(8)
        setusdvalue(usdequi);
        setValue(btcequi);
      }
      else{
        setnairavalue('');
        setusdvalue('');
        setValue('');
      }
      
    }
    else{
      Swal.fire({
        title: 'Merket Rate Error!',
        text: 'Market Rate Not Available',
        icon: 'success',
        confirmButtonText: 'ok'
      });
      modifyOpen(!statemodal)
    }

   
  }
  const handeChangeBtc=(e)=>{
    if(parseFloat(marketrate)){
      const {value} = e.target
      if(value){
        const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
        setValue(formattedValue)
        const newjupitrate = parseFloat(jupitrate);
        const newmarketrate = parseFloat(marketrate);
        const usdequi = parseFloat(value.replace(/,/g, '')) * newmarketrate
        const nairaequi = parseFloat(usdequi) * newjupitrate
        setusdvalue(usdequi.toLocaleString());
        setnairavalue(nairaequi.toLocaleString());
      }
      else{
        setusdvalue('');
        setnairavalue('');
        setValue('')
      }
      
    }
    else{
      Swal.fire({
        title: 'Merket Rate Error!',
        text: 'Market Rate Not Available',
        icon: 'success',
        confirmButtonText: 'ok'
      });
      modifyOpen(!statemodal)
    }
    
    
  }
  const handeChangeUsd=(e)=>{
    if(parseFloat(marketrate)){
      const {value} = e.target
     
      if(value){
        const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
        setusdvalue(formattedValue)
        
        const newjupitrate = parseFloat(jupitrate);
        const newmarketrate = parseFloat(marketrate);
        
        const nairaequi = parseFloat(value.replace(/,/g, '')) * newjupitrate;
        setnairavalue(nairaequi.toLocaleString());
        

        const btcequi = parseFloat(value.replace(/,/g, ''))/parseFloat(newmarketrate).toFixed(8);
        const dp = 10**5;
        const xp = Math.round(btcequi * dp)/dp;
        setValue(xp)
      }
      else{
        setusdvalue('')
        setValue('');
        setnairavalue('')
      }
      
    }
    else{
      Swal.fire({
        title: 'Merket Rate Error!',
        text: 'Market Rate Not Available',
        icon: 'success',
        confirmButtonText: 'ok'
      });
      modifyOpen(!statemodal)
    }

    
  }

  const handeChangeN =(e)=>{
    const {value} = e.target
    if(value){
      const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
      setValue(formattedValue)
    }
    else{
      setValue('')
    }
   
  }
  return (
    <div>
      <Modal
        open={statemodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          {modalTitle === "BTC Wallet Balance" || modalTitle === "USDT Wallet Balance"  ?
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={4}>
                <TextField
                    required
                    id="outlined-required"
                    label={modalTitle === "USDT Wallet Balance"? "USDT Amount" : "BTC Amount"}
                    value={value || ''}
                    
                    fullWidth
                    onChange={handeChangeBtc}
                    type="text"
                  />   
                  <Iconify icon="carbon:arrows-horizontal" width={50} height={50}/>
                  <TextField
                    required
                    id="outlined-required"
                    
                    label="USD Amount"
                    value={usdvalue|| ''}
                    fullWidth
                    onChange={handeChangeUsd}
                    type="text"
                  /> 
                  <Iconify icon="carbon:arrows-horizontal" width={50} height={50}/>
                  <TextField
                    required
                    id="outlined-required"
                    label="Naira Amount"
                    value={nairavalue || ''}
                    fullWidth
                    onChange={handeChangeNaira}
                    type="text"
                  />   
            </Stack>
                    :

                    <TextField
                    required
                    id="outlined-required"
                    label="Naira Amount"
                    value={value|| ''}
                    style={{marginTop:20}}
                    onChange={handeChangeN}
                    type="text"
                  />  

        
        
        
        }
       



         
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              
            <Button variant="outlined" disableElevation style={{marginTop:10}} disabled={disablebtn} onClick={()=>handleCreditWallet()}>Credit User Wallet</Button>
            
           
        </Typography>
        </Box>
      </Modal>
    </div>
  );
}

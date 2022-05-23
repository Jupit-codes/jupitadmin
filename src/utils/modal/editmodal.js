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



export default function BasicModal({statemodal,modifyOpen,modalTitle,userid,marketrate,jupitrate,page}) {
  const [open, setOpen] = React.useState(false);
  const [disablebtn,setdisablebtn] = React.useState(false)
  const [value, setValue] = React.useState(0);
  const [usdvalue, setusdvalue] = React.useState(0);
  const [nairavalue, setnairavalue] = React.useState(0);
  const handleClose = () => modifyOpen(!statemodal);
  const BaseUrl = process.env.REACT_APP_ADMIN_URL
  const handleCreditWallet = async ()=>{
   console.log(value)
   setdisablebtn(true)
    await axios({
      url:`${BaseUrl}/admin/manual/wallet/credit`,
      method:"POST",
      headers:{
        "Content-type":'application/json',
        "Authorization":reactLocalStorage.get('token')
      },
      data:JSON.stringify({value,modalTitle,userid})

    })
    .then((res)=>{
      console.log(res.data);
      if(res.data.status){
        setdisablebtn(false);
        Swal.fire({
          title: 'Message!',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'ok'
        });
        page(true)
        modifyOpen(!statemodal)
        
      }

    })
    .catch((err)=>{
      console.log(err.response);
    })
  }

  const handeChange= (e)=>{
    setValue(e.target.value)
  }
  const handeChangeNaira=(e)=>{
    setnairavalue(e.target.value);
    const newjupitrate = parseFloat(jupitrate);
    const newmarketrate = parseFloat(marketrate);
    const usdequi = parseFloat(e.target.value) / newjupitrate
    const btcequi = parseFloat(usdequi/newmarketrate).toFixed(8)
    setusdvalue(usdequi);
    setValue(btcequi)
  }
  const handeChangeBtc=(e)=>{
    
  }
  const handeChangeUsd=(e)=>{
    setusdvalue(e.target.value);
    const newjupitrate = parseFloat(jupitrate);
    const newmarketrate = parseFloat(marketrate);
    const nairaequi = parseFloat(e.target.value) * newjupitrate;
    setnairavalue(nairaequi);
    const btcequi = parseFloat(e.target.value/newmarketrate).toFixed(8);
    console.log(btcequi)
    setValue(btcequi)

    
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
                    type="number"
                  />   
                  <Iconify icon="carbon:arrows-horizontal" width={50} height={50}/>
                  <TextField
                    required
                    id="outlined-required"
                    
                    label="USD Amount"
                    value={usdvalue|| ''}
                    fullWidth
                    onChange={handeChangeUsd}
                    type="number"
                  /> 
                  <Iconify icon="carbon:arrows-horizontal" width={50} height={50}/>
                  <TextField
                    required
                    id="outlined-required"
                    label="Naira Amount"
                    value={nairavalue|| ''}
                    fullWidth
                    onChange={handeChangeNaira}
                    type="number"
                  />   
            </Stack>
                    :

                    <TextField
                    required
                    id="outlined-required"
                    label="Naira Amount"
                    value={nairavalue|| ''}
                    style={{marginTop:20}}
                    onChange={handeChange}
                    type="number"
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

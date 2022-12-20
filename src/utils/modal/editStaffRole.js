import * as React from 'react';
import {useEffect} from 'react'
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import { Stack,Select,MenuItem,InputLabel,Checkbox } from '@mui/material';
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



export default function EditStaffRole({userid,staffusername,update,loader,modifyOpen,statemodal,rolename}) {
  const [open, setOpen] = React.useState(false);
  const [disablebtn,setdisablebtn] = React.useState(false)
  const [newRolename, setnewRoleName] = React.useState('');
  const [staffUsername, setStaffUsername] = React.useState('');
  const [allroles, setallroles] = React.useState('');
  const [selectedRole,setSelectedrole] = React.useState('')
  const[roler,setRoler] = React.useState(false)
  const [previledges,setPreviledge] = React.useState([])
  const[mount,setMount] = React.useState(false)
  const availablePreviledge = [
    {
        title:"Transaction History",
        value:"Transaction History"
    },
    {

        title:"Total transaction Count",
        value:"Transaction Count"
    },
    {

        title:"Customer Information",
        value:"Customer Information"
    },
    {
        title:"Customer Transaction Balances",
        value:"Customer Balances"
    },

    {
        title:"Trade Log",
        value:"Trade Log"
    },
    {
        title:"All Deposit",
        value:"All Deposit"
    },
    {
        title:"Disable 2FA",
        value:"Disable 2FA"
    },
    {
        title:"Account Suspension",
        value:"Account Suspension"
    },
    {
        title:"Account Blockage",
        value:"Account Blockage"
    },
    {
        title:"Blacklist",
        value:"Blacklist"
    },
    {
        title:"Transaction Log",
        value:"Transaction Log"
    },
    {
        title:"All Withdrawal",
        value:"All Withdrawal"
    },
    {
        title:"Initialise Rate",
        value:"Initialise Rate"
    },
    {
        title:"Asset Undermanagement Crypto",
        value:"Asset Undermanagement Crypto"
    },
    {
        title:"Asset Undermanagement Fiat",
        value:"Asset Undermanagement Fiat"
    },
    {
        title:"Manual Deposit",
        value:"Manual Deposit"
    },
    {
        title:"Manual Withdrawal",
        value:"Manual Withdrawal"
    },
    {
        title:"Crypto Ledger",
        value:"Crypto Ledger"
    },
    {
        title:"Fiat Ledger",
        value:"Fiat Ledger"
    }

]  
  useEffect(()=>{
        setTimeout(()=>{
            getStaffRole();
            getStaffPreviledge()
            setStaffUsername(staffusername)
            setnewRoleName(rolename)
            setSelectedrole(newRolename)
            

        },1000)

  },[])



  const _renderRoles = ()=>{
    return  allroles && allroles.length > 0 && allroles.map((d,index)=>{
        return rolename === d.rolename ? <MenuItem key={index} value={d.rolename} selected>{d.rolename}</MenuItem> : <MenuItem key={index} value={d.rolename}>{d.rolename}</MenuItem>
    })
 }

  const handleRole= (e) =>{
        
    setSelectedrole(e.target.value)
  
}

  const getStaffRole = async ()=>{
    const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/get/allroles`,
        method:'GET',

        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        }
        
      })
      .then((res)=>{
       console.log(res.data);
      setallroles(res.data.data)
      //  alert(res.data.message);
      //  Swal.fire({
      //     title: 'Message!',
      //     text: res.data.message,
      //     icon: 'success',
      //     confirmButtonText: 'ok'
      //   });
       
  
      })
      .catch((err)=>{
         
          if(err.response){
              alert(err.response.data)
          }
            console.log(err.response)
      })
  
   }

   const getStaffPreviledge = async ()=>{
    setRoler(true)
    console.log("userid",userid)
    const BaseUrl = process.env.REACT_APP_ADMIN_URL  
    await axios({
    
        url:`${BaseUrl}/admin/staff/individual`,
        method:'POST',
        data:JSON.stringify({staffid:userid}),
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        }
        
      })
      .then((res)=>{
        console.log("staff",res.data.previledge);
        setRoler(false)
        setMount(true)
        setPreviledge(res.data.previledge)
     
      })
      .catch((err)=>{
         
          if(err.response){
              alert(err.response.data)
          }
            console.log(err.response)
      })
  
   }


 const Submit = async ()=>{
  console.log(selectedRole)
  const BaseUrl = process.env.REACT_APP_ADMIN_URL  
        await axios({
        
            url:`${BaseUrl}/admin/staff/edit`,
            method:'POST',
            headers:{
              'Content-Type':'application/json',  
              'Authorization': reactLocalStorage.get('token')
            },
            data:JSON.stringify({previledges,userid,selectedRole})
          })
          .then((res)=>{
           console.log(res.data);
          
          
           Swal.fire({
              title: 'Message!',
              text: res.data.message,
              icon: 'success',
              confirmButtonText: 'ok'
            });
           
      
          })
          .catch((err)=>{
              
              if(err.response){
                  alert(err.response.data)
              }
                console.log(err.response)
          })
 } 
   
  
 
  const handleClose = () => modifyOpen(!statemodal);

    
    const handeChangeRole = (e)=>{
        setnewRoleName(e.target.value)
    }
 
//   const handleRoleEdit = async ()=>{
//     const BaseUrl = process.env.REACT_APP_ADMIN_URL
//    setdisablebtn(true)
//     await axios({
//       url:`${BaseUrl}/admin/edit/rolename`,
//       method:"POST",
//       headers:{
//         "Content-type":'application/json',
//         "Authorization":reactLocalStorage.get('token')
//       },
//       data:JSON.stringify({rowid,newrolename:newRolename})

//     })
//     .then((res)=>{
     
//       if(res.data.status){
//         setdisablebtn(false);
//         Swal.fire({
//           title: 'Message!',
//           text: res.data.message,
//           icon: 'success',
//           confirmButtonText: 'ok'
//         });
        
//         reloadData(!refresh)
//         modifyOpen(!statemodal)
        
//       }

//     })
//     .catch((err)=>{
//       console.log("errorx",err.response);
//     })
//   }


const handleResource = (e)=>{
 
    if(e.target.checked){
      
      if(!previledges.includes(e.target.value)){
        previledges.push(e.target.value)
      }
      
    }
    else if(!e.target.checked){
      console.log('Unchecked');
      if(previledges.length >  0){
          for( let i = 0; i< previledges.length; i += 1){ 
            console.log(previledges[i])
            if ( previledges[i] === e.target.value) { 
        
                previledges.splice(i, 1); 
            }
        
        }
      
      }
      
    }
    console.log("previledge",previledges)
   
  }

  const handleChecked = (value)=>{
      if(previledges.includes(value)){
        return true
      }
      
      return false
  }

const _renderPreviledges = ()=>{
   
   console.log("previledges",console)
   return availablePreviledge &&  availablePreviledge.map((d,index)=>{
                        
                 return previledges && previledges.length > 0 && previledges.includes(d.value) && <>
                            <Checkbox 
                                key={index}
                                onChange={handleResource}
                                value={d.value || ''}
                                inputProps={{ 'aria-label': 'controlled' }}
                                color="success"
                                defaultChecked
                                /> <span>{d.title}</span>
                        </>
                      
                                                                    
    })
   
}

const _rendernewPreviledges = ()=>{
  
  return availablePreviledge &&  availablePreviledge.map((d,index)=>{
                       
                return previledges && previledges.length > 0 && !previledges.includes(d.value) && <>
                           <Checkbox 
                               key={index}
                               onChange={handleResource}
                               value={d.value || ''}
                               inputProps={{ 'aria-label': 'controlled' }}
                               color="primary" 
                               /> <span>{d.title}</span>
                       </>
                                                                   
   })
  
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
           Edit Staff Role
          </Typography>
         
                    <TextField
                    required
                    id="outlined-required"
                    label="Staff Username"
                    value={staffUsername|| ''}
                    style={{marginTop:20}}
                    disabled
                    type="text"
                  />  
                  <TextField
                    required
                    id="outlined-required"
                    label="Staff Current Role"
                    value={newRolename|| ''}
                    style={{marginTop:20,marginLeft:10}}
                    disabled
                    onChange={handeChangeRole}
                    type="text"
                  /> 
                  
                  <InputLabel id="demo-simple-select-label" style={{marginTop:10}}>Select New Role</InputLabel>
                  {allroles.length > 0 && 
                        <Select
                            fullWidth
                            style={{marginTop:20}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRole||''}
                            label="Select Role"
                            onChange={handleRole}
                            >
                            {_renderRoles()}
                        </Select> 
                    } 
                  

            <Typography>
                {roler && 'Loading Priviledges'}
                {!roler && mount && _renderPreviledges()}
                {!roler && mount && _rendernewPreviledges()}
            </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              
            <Button variant="outlined" disableElevation style={{marginTop:10}} disabled={disablebtn} >Submit</Button>
        </Typography>
        </Box>
      </Modal>
    </div>
  );
}

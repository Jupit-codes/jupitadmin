import { useEffect, useState } from "react";
import axios from "axios";

import { reactLocalStorage } from "reactjs-localstorage";
import { Container,Stack,Button,Typography,TextField } from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Iconify from "../components/Iconify";
import Page from "../components/Page";



const Index=()=>{
    const navigate = useNavigate();
    const [data,setdata] =useState([]);
    const [data_bank,setdata_bank] =useState([]);
    const[data_details,setdata_details] = useState();
    const [loader,setLoader] =useState(false);
    const [failedRequest,setFailedRequest] =useState(false);
    const [disableBTN,setdisableBTN] = useState(false)
    const {id} = useParams();
    const fetchGiftCardUpload = async ()=>{
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
        setFailedRequest(false)
        setLoader(true)
    await axios({
    
        url:`${BaseUrl}/admin/get/uploadedgiftcards`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        data:JSON.stringify({
            id
        })
        
      })
      .then((res)=>{
       console.log(res.data)
        setLoader(false)
        setdata(res.data.message);
        setdata_details(res.data.message_details)
        setdata_bank(res.data.message_bank)
  
        
  
      })
      .catch((err)=>{
          
            console.log(err.response);
            setLoader(false);
            setFailedRequest(true)
           
            
      })
    }

    useEffect(()=>{
        setLoader(true)
        fetchGiftCardUpload();
    },[])

    const renderComponent = ()=>{
        return data.map((d,index)=>{
            return <div key={index}>
                     <img src={d.image_url} alt="uploaded giftcard"/>

                    </div>
        })
    }

    const renderComponentDetails= ()=>{
        return data_details.map((d,index)=>{
            return <div key={index}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <TextField
                                    label="Userid"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ d.userid || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                    
                                <TextField
                                    label="Total In USD"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ d.amount_in_usd || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                    <TextField
                                    label="Total In Naira"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ d.total || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                    <TextField
                                    label="CardName"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ d.cardname || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                     <TextField
                                    label="Country"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ d.country || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                      </Stack>

                    </div>
        })
    }

    const renderComponentBank= ()=>{
       
            return <div>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <TextField
                                    label="Bank"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ data_bank.bank_code || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                    
                                <TextField
                                    label="Account Number"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ data_bank.account_number || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                    <TextField
                                    label="Account Name"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={data_bank.account_name || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                                    
                                     <TextField
                                    label="Email"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '20ch' }}
                                    value={ data_bank.email || ''}
                                    variant='filled'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    />
                      </Stack>

                    </div>
    
    }

    const markHasTreated = async () =>{
        const BaseUrl = process.env.REACT_APP_ADMIN_URL  
        setdisableBTN(true)
    await axios({
    
        url:`${BaseUrl}/admin/giftcard/markhastreated`,
        method:'POST',
        headers:{
          'Content-Type':'application/json',  
          'Authorization': reactLocalStorage.get('token')
        },
        data:JSON.stringify({
            id
        })
        
      })
      .then((res)=>{
        setdisableBTN(false)
       console.log(res.data)
        if(res.data.status){
            Swal.fire({
                title: 'Message!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'ok'
              });
              navigate('/dashboard/giftcard/sell/transactions',{replace:true})
        }
      
      })
      .catch((err)=>{
        setdisableBTN(false)
            console.log(err.response);
           
           
            
      })
    }

    return (
        <>
            <Page title="Uploaded GiftCards">
                <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                    <Typography variant="h4" gutterBottom>
                       Uploaded GiftCard For Sale
                    </Typography>
                    <Button variant="contained"  to="#" disabled={disableBTN} startIcon={<Iconify icon="clarity:export-line" />} onClick={()=>markHasTreated()}>
                        Mark has Treated
                    </Button>
                </Stack>
                    {loader && <div className='myloader'>loading data...</div>}
                    {!loader && failedRequest && <div className='myloader'><small>Verification Failed...Click Below to Reload</small><Iconify icon="icon-park-twotone:reload" width="48px" height="48px" onClick={()=>{fetchGiftCardUpload()}}/></div>}
                    {data && <div className="uploadDiv">{renderComponent()}</div>}
                    {data_details && <div className="">{renderComponentDetails()}</div>}
                    {data_bank && <div className="">{renderComponentBank()}</div>}
                </Container>

            </Page>
            
            
        
        </>
       

        
    )
}

export default Index;
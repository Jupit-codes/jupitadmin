import { useEffect, useState } from 'react';
import { Navigate, Outlet, useRoutes,Routes,Route,useNavigate } from 'react-router-dom';
// layouts
import { styled } from '@mui/material/styles';
import {reactLocalStorage} from 'reactjs-localstorage';
import { CSVLink } from "react-csv";

import {useIdleTimer} from 'react-idle-timer';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import LoadAuthorization from './utils/Reauthorization'
//

import ProtectedRoutes from './ProtectedRoute';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import UserProfile from './pages/userprofile'
import UserAccountProfile from './pages/useraccountprofile'
import DashboardApp from './pages/DashboardApp';
import AllTransaction from './pages/alltransaction'
import DashboardNavbar from './layouts/dashboard/DashboardNavbar';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import SetRate from './pages/SetRate';
import ChangePassword from './pages/changepassword'
import AwaitingApproval from './pages/pending'
import VerificationPortal from './pages/verifyIdcard'
import GiftCardSell from './pages/giftcardsellfetch'
import GiftCardBuy from './pages/giftcardbuyfetch'
import GiftCardUpload from './pages/Giftcarduploads'
import AllStaff from './pages/staff'
import Alldeposit from './pages/alldeposit';
import Allwithdrawal from './pages/allwithdrawal';


// ----------------------------------------------------------------------

export default function Router({redirectPath='/login'}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const APP_BAR_MOBILE = 64;
  const APP_BAR_DESKTOP = 92;

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

  const MainStyle = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }));

  const onIdle =()=>{
    console.log('User is idle')
  }

  const onActive = ()=>{
    console.log('user is active')
  }
  
  const timeout = 5 * 60 * 1000;
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [lastActive, setLastActive] = useState(+new Date());
  const [isIdle, setIsIdle] = useState(false);
  const [sessionExpired, setsessionExpired] = useState(false);
  const [modalHandeler,setmodalHandler] = useState(false);
  const [passwordChecker,setpasswordChecker] = useState();
  const handleOnActive = () => {
    
    setIsIdle(false)
    
    
  }
  const handleOnIdle = () =>{
   
    setIsIdle(true)
    reset();
    // setmodalHandler(true)
    
  } 
  

  const {
    reset,
    pause,
    resume,
    getRemainingTime,
    getLastActiveTime,
    getElapsedTime
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle
  })

  useEffect(()=>{

  },[isIdle])
 

  const ProtectLogin = () => {


    if (reactLocalStorage.get('token') && reactLocalStorage.getObject('admin') ) {
      
      return <Navigate to='/dashboard/app' replace />;
    }

   
    return <Outlet/>
      
  }
  
  const ProtectedRoute = () => {

    if (!reactLocalStorage.get('token') || !reactLocalStorage.getObject('admin')) {
      
      return <Navigate to={redirectPath} replace />;
    }

   const byebye = ()=>{
     reactLocalStorage.clear();
     setIsIdle(false)
     navigate('/login',{replace:true})
   }
  
    const today = new Date();
    // const x = today.setHours(today.getHours() - 1);
    console.log("xxxx",today);

 
    const rurTime = reactLocalStorage.getObject('admin').reauthorization;

    const daterurTime = new Date(rurTime).getTime();
    const todayCurl= new Date(today).getTime()
    
    if(todayCurl > daterurTime){
      console.log('Session Expired');
      setsessionExpired(true);
    }
    else{
      setsessionExpired(false)
    }
    
    const appstate=isIdle
    return <RootStyle>
              {sessionExpired && <LoadAuthorization closeModal={setmodalHandler} modifyIdle={setsessionExpired}/>}
              {isIdle && byebye()}
              <DashboardNavbar onOpenSidebar={() => setOpen(true)}  check={passwordChecker} />
              <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} check={passwordChecker} />
              <MainStyle>
                
                <Outlet context={[appstate]}  />
              </MainStyle>
            </RootStyle>

  //  return <Outlet/>;
  };


  return <Routes>
        
          <Route path="/" element={<ProtectLogin><LogoOnlyLayout /></ProtectLogin>} >
            <Route path="/login" element={<Login />} />
            <Route path="create/super/admin/" element={<Register/>} />
          </Route>
          
          <Route path="dashboard" element={<ProtectedRoute><DashboardLayout   /></ProtectedRoute>}>
            <Route path="app" element={<DashboardApp  />} />
            <Route path="user" element={<User/>} />
            <Route path="user/:id" element={<UserProfile/>} />
            <Route path="user/account/:account" element={<UserAccountProfile/>} />
            <Route path="setrate" element={<SetRate/>} />
            <Route path="product" element={<Products />} />
            <Route path="blog" element={<Blog />} />
            <Route path="alltransactions" element={<AllTransaction/>}/>
            <Route path="alldeposit" element={<Alldeposit/>}/>
            <Route path="allwithdrawal" element={<Allwithdrawal/>}/>
            <Route path="awaiting/approval" element={<AwaitingApproval/>}/>
            <Route path="idcard/user/verification/" element={<VerificationPortal/>}/>
            <Route path="changepassword" element={<ChangePassword  update={setpasswordChecker}/>} />
            <Route path="giftcard/sell/transactions" element={<GiftCardSell />} />
            <Route path="giftcard/buy/transactions" element={<GiftCardBuy />} />
            <Route path='giftcard/sell/cardupload/:id' element={<GiftCardUpload/>} />
            <Route path='get/all/staffs' element={<AllStaff/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
}

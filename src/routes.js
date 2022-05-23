import { useState } from 'react';
import { Navigate, Outlet, useRoutes,Routes,Route } from 'react-router-dom';
// layouts
import { styled } from '@mui/material/styles';
import {reactLocalStorage} from 'reactjs-localstorage';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import ProtectedRoutes from './ProtectedRoute';
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import UserProfile from './pages/userprofile'
import DashboardApp from './pages/DashboardApp';
import DashboardNavbar from './layouts/dashboard/DashboardNavbar';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import SetRate from './pages/SetRate';

// ----------------------------------------------------------------------

export default function Router({redirectPath='/'}) {
  const [open, setOpen] = useState(false);
 
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

  const ProtectedRoute = () => {
    if (!reactLocalStorage.get('token')) {
      
      return <Navigate to={redirectPath} replace />;
    }
    
    return <RootStyle>
              <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
              <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
              <MainStyle>
                <Outlet />
              </MainStyle>
            </RootStyle>

  //  return <Outlet/>;
  };


  // return useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
  //     children: [
  //       { path: 'app', element: <DashboardApp />  },
  //       { path: 'user', element: <User/> },
  //       { path: 'products', element: <Products /> },
  //       { path: 'blog', element: <Blog /> },
  //     ],
  //   },
  //   {
  //     path: '/',
  //     element: <LogoOnlyLayout />,
  //     children: [
  //       // { path: 'db', element:<ProtectedRoute><Navigate to="dashboard/app" /></ProtectedRoute>  },
  //       { path: '/', element: <Login /> },
  //       { path: 'register', element: <Register /> },
  //       { path: '404', element: <NotFound /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   { path: '*', element: <Navigate to="/404" replace /> },
  // ]);

  return <Routes>
        
          <Route path="/" element={<LogoOnlyLayout />} >
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register/>} />
          </Route>
          
          <Route path="dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="app" element={<DashboardApp />} />
            <Route path="user" element={<User/>} />
            <Route path="user/:id" element={<UserProfile/>} />
            <Route path="setrate" element={<SetRate/>} />
            <Route path="product" element={<Products />} />
            <Route path="blog" element={<Blog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
}

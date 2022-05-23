
import Login from '../pages/Login'
import Register from  '../pages/Register'
import Dashboard from  '../pages/DashboardApp'

const route = [
   
    {
        path:'/',
        title:'Admin SignIn | Jupit',
        isAuthenticated:false,
        component:Login,

    },
    {
        path:'/admin/onboard/new',
        title:'Admin SignUp | Jupit',
        isAuthenticated:false,
        component:Register,

    },
  
    {
        path:'/admin/dashboard/new',
        title:'Admin Dashboard | Jupit',
        isAuthenticated:true,
        component:Dashboard,

    },
    

    
 
   
 
   
]

export default route;
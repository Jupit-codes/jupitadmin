// component

import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    roles:[1],
    previledges:['All']
  },
  {
    title: 'User Management',
    path: '',
    icon: getIcon('eva:people-fill'),
    children:[
      {
      title:'User Profile',
      path:'/dashboard/user',
      previledges:['All','Customer Information']
      },
      {
        title:'Identity Approval',
        path:'/dashboard/awaiting/approval',
        previledges:['All','Awaiting Approval']
        }
  ]
    ,
    roles:[1,2,5,3,4],
    previledges:['All','Customer Information','Awaiting Approval']
  },
  {
    title: 'Rate Board',
    path: '',
    icon: getIcon('icon-park-outline:set-off'),
    children:[
      {
      title:'Initialise Rate (Crypto & Gift Cards)',
      path:'/dashboard/setrate',
      previledges:['All','Initialise Rate']
      },
      {
        title:'Rate Log(Crypto & Gift Cards)',
        path:'/dashboard/setrate',
        previledges:['All','Initialise Rate']
        }
    ],
    roles:[1],
    previledges:['All','Initialise Rate']
  },
  // {
  //   title: 'Transactions Log',
  //   path: '/dashboard/alltransactions',
  //   icon: getIcon('icon-park-outline:transaction-order'),
  //   roles:[1,2,3,4],
  //   previledges:['All','Transaction Log']
  // },
  // {
  //   title: 'Awaiting Approval',
  //   path: '/dashboard/awaiting/approval',
  //   icon: getIcon('mdi:lan-pending'),
  //   roles:[1],
  //   previledges:['All']
  // },
  {
    title: 'Cryptocurrency',
    path: '',
    icon: getIcon('icon-park-outline:set-off'),
    roles:[1],
    children:[
      {
      title:'Asset Under Management',
      path:'/dashboard/asset/undermanagement/crypto',
      previledges:['All','Asset Undermanagement Crypto']
      },
      {
        title:'Crypto Ledger',
        path:'/dashboard/asset/crypto/ledger',
        previledges:['All','Crypto Ledger']
        
        }
  ],
    previledges:['All','Asset Undermanagement Crypto','Crypto Ledger']
  },
  // {
  //   title: 'Crypto Ledger ',
  //   path: '/dashboard/asset/crypto/ledger',
  //   icon: getIcon('icon-park-outline:set-off'),
  //   roles:[1],
  //   previledges:['All','Crypto Ledger ']
  // },
  {
    title: 'Fiat',
    path: '',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    children:[
      {
        title:'Asset Under Management',
        path:'/dashboard/asset/undermanagement/fiat',
        previledges:['All','Asset Undermanagement Fiat']
      },
      {
        title:'Fiat Ledger',
        path:'/dashboard/asset/fiat/ledger',
        previledges:['All','Fiat Ledger']
      },
      {
        title:'Deposit',
        path:'/dashboard/alldeposit',
        previledges:['All','All Deposit']
        
      },
      {
          title:'Withdrawal',
          path:'/dashboard/allwithdrawal',
          previledges:['All','All Withdrawal']
      }
  ],
    previledges:['All','Asset Undermanagement Fiat','All Deposit','All Withdrawal','Fiat Ledger']
  },
  // {
  //   title: 'Fiat Ledger',
  //   path: '/dashboard/asset/fiat/ledger',
  //   icon: getIcon('icon-park-outline:set-off'),
  //   roles:[1],
  //   previledges:['All','Fiat Ledger']
  // },
  {
    title: 'Transactions',
    path: '/dashboard/total/transaction/count',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    children:[
      {
        title:'Transaction Log',
        path:'/dashboard/alltransactions',
        previledges:['All','Transaction Log']
      },
      {
        title:'Transaction Count',
        path:'/dashboard/total/transaction/count',
        previledges:['All','Transaction Count']
      },
      
  ],
    previledges:['All','Transaction count','Transaction Log']
  },
  {
    title: 'Administrator',
    path: '',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    children:[
      {
        title:'Create Role',
        path:'/dashboard/create/admin/role',
        previledges:['All']
      },
      {
        title:'Create Staff',
        path:'/dashboard/create/admin/staff',
        previledges:['All']
      },
      {
        title:'Staff Management',
        path:'/dashboard/get/all/staffs',
        previledges:['All']
      },
      {
        title:'Staff Authorization',
        path:'',
        previledges:['All']
      },
      
  ],
    previledges:['All']
  },
  // {
  //   title: 'Create Staff',
  //   path: '/dashboard/create/admin/staff',
  //   icon: getIcon('mdi:lan-pending'),
  //   roles:[1],
  //   previledges:['All']
  // },
  // {
  //   title: 'GiftCard Sell Request',
  //   path: '/dashboard/giftcard/sell/transactions',
  //   icon: getIcon('ic:baseline-sell'),
  //   roles:[1,6]
  // },
  // {
  //   title: 'GiftCard Buy Request',
  //   path: '/dashboard/giftcard/buy/transactions',
  //   icon: getIcon('ic:baseline-sell'),
  //   roles:[1,6]
  // },
  // {
  //   title: 'Staff Management',
  //   path: '/dashboard/get/all/staffs',
  //   icon: getIcon('fa-solid:users-cog'),
  //   roles:[1],
  //   previledges:['All']
  // },
  // {
  //   title: 'All Deposit',
  //   path: '/dashboard/alldeposit',
  //   icon: getIcon('fa-solid:users-cog'),
  //   roles:[1,3],
  //   previledges:['All','All Deposit']
  // },
  // {
  //   title: 'All Withdrawal',
  //   path: '/dashboard/allwithdrawal',
  //   icon: getIcon('fa-solid:users-cog'),
  //   roles:[1,3],
  //   previledges:['All','All Withdrawal']
  // },
  // {
  //   title: 'All Buy',
  //   path: '/dashboard/allbuy',
  //   icon: getIcon('fa-solid:users-cog'),
  //   roles:[1]
  // },
  // {
  //   title: 'Transaction Log',
  //   path: '/dashboard/allbuy/n/sell',
  //   icon: getIcon('fa-solid:users-cog'),
  //   roles:[1]
  // },
];

export default navConfig;

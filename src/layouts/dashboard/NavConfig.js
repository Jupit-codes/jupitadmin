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
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
    roles:[1,2,5,3,4],
    previledges:['All','Customer Information']
  },
  {
    title: 'Initialise Rate',
    path: '/dashboard/setrate',
    icon: getIcon('icon-park-outline:set-off'),
    roles:[1],
    previledges:['All','Initialise Rate']
  },
  {
    title: 'Transactions Log',
    path: '/dashboard/alltransactions',
    icon: getIcon('icon-park-outline:transaction-order'),
    roles:[1,2,3,4],
    previledges:['All','Transaction Log']
  },
  {
    title: 'Awaiting Approval',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    previledges:['All']
  },
  {
    title: 'Asset Undermanagement Crypto',
    path: '/dashboard/asset/undermanagement/crypto',
    icon: getIcon('icon-park-outline:set-off'),
    roles:[1],
    previledges:['All','Asset Undermanagement Crypto']
  },
  {
    title: 'Asset Undermanagement Fiat',
    path: '/dashboard/asset/undermanagement/fiat',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    previledges:['All','Asset Undermanagement Fiat']
  },
  {
    title: 'Transaction Count',
    path: '/dashboard/total/transaction/count',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    previledges:['All','Transaction count']
  },
  {
    title: 'Create Admin Role',
    path: '/dashboard/create/admin/role',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    previledges:['All']
  },
  {
    title: 'Create Staff',
    path: '/dashboard/create/admin/staff',
    icon: getIcon('mdi:lan-pending'),
    roles:[1],
    previledges:['All']
  },
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
  {
    title: 'Staff Management',
    path: '/dashboard/get/all/staffs',
    icon: getIcon('fa-solid:users-cog'),
    roles:[1],
    previledges:['All']
  },
  {
    title: 'All Deposit',
    path: '/dashboard/alldeposit',
    icon: getIcon('fa-solid:users-cog'),
    roles:[1,3],
    previledges:['All','Deposit Log']
  },
  {
    title: 'All Withdrawal',
    path: '/dashboard/allwithdrawal',
    icon: getIcon('fa-solid:users-cog'),
    roles:[1,3],
    previledges:['All','Withdrawal Log']
  },
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

// component

import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
    roles:[1]
  },
  {
    title: 'User Management',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
    roles:[1,2,5,3,4]
  },
  {
    title: 'Initialise Rate',
    path: '/dashboard/setrate',
    icon: getIcon('icon-park-outline:set-off'),
    roles:[1,2,4]
  },
  {
    title: 'Transactions Log',
    path: '/dashboard/alltransactions',
    icon: getIcon('icon-park-outline:transaction-order'),
    roles:[1,2,3,4]
  },
  {
    title: 'Awaiting Approval',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('mdi:lan-pending'),
    roles:[1]
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
    roles:[1]
  },
  {
    title: 'All Deposit',
    path: '/dashboard/alldeposit',
    icon: getIcon('fa-solid:users-cog'),
    roles:[1,3]
  },
  {
    title: 'All Withdrawal',
    path: '/dashboard/allwithdrawal',
    icon: getIcon('fa-solid:users-cog'),
    roles:[1,3]
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

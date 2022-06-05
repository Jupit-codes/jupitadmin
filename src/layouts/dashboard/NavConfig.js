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
    roles:[1,2]
  },
  {
    title: 'Initialise Rate',
    path: '/dashboard/setrate',
    icon: getIcon('icon-park-outline:set-off'),
    roles:[1]
  },
  {
    title: 'All Wallet Transactions',
    path: '/dashboard/alltransactions',
    icon: getIcon('icon-park-outline:transaction-order'),
    roles:[2]
  },
  {
    title: 'Awaiting Approval',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('mdi:lan-pending'),
    roles:[1]
  },
  {
    title: 'GiftCard Sell Request',
    path: '/dashboard/giftcard/sell/transactions',
    icon: getIcon('ic:baseline-sell'),
    roles:[1]
  },
  {
    title: 'Staff Management',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('fa-solid:users-cog'),
    roles:[1,2]
  },
];

export default navConfig;

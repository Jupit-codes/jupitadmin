// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'User Management',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Initialise Rate',
    path: '/dashboard/setrate',
    icon: getIcon('icon-park-outline:set-off'),
  },
  {
    title: 'All Wallet Transactions',
    path: '/dashboard/alltransactions',
    icon: getIcon('icon-park-outline:transaction-order'),
  },
  {
    title: 'Awaiting Approval',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('mdi:lan-pending'),
  },
  {
    title: 'GiftCard Sell Request',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('ic:baseline-sell'),
  },
  {
    title: 'GiftCard Buy Request',
    path: '/dashboard/awaiting/approval',
    icon: getIcon('icons8:buy'),
  },
  // {
  //   title: 'Asset Analysis',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;

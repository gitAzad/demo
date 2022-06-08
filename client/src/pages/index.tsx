import Profile from '../components/User/Profile';
import Home from './Home';
import Login from './Login';
import NotFoundPage from './NotFoundPage';

const pages = [
  {
    auth: false,
    path: '/',
    main: Home,
  },
  {
    auth: false,
    path: '/profile',
    main: Profile,
  },
  {
    auth: false,
    path: '/login',
    main: Login,
  },

  {
    auth: false,
    path: '*',
    main: NotFoundPage,
  },
];

export default pages;

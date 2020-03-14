import Landing from '@pages/Landing';
import Home from '@pages/Home';

export const routes = [
  {
    id: 1,
    path: '/',
    exact: true,
    component: Landing,
  },
  {
    id: 2,
    path: '/room',
    exact: false,
    component: Home,
  },
];

import Landing from '@pages/Landing';
import Room from '@pages/Room';
import Rooms from '@pages/Rooms';

// TODO: The routes need to be changed in the future
export const routes = [
  {
    id: 1,
    path: '/',
    exact: true,
    component: Landing,
  },
  {
    id: 2,
    path: '/rooms/:id',
    exact: false,
    component: Room,
  },
  {
    id: 3,
    path: '/rooms',
    exact: true,
    component: Rooms,
  },
  {
    id: 4,
    path: '/about',
    exact: false,
    // Add about page
    component: () => null,
  },
  {
    id: 5,
    path: '/faq',
    exact: false,
    // Add FAQ page
    component: () => null,
  },
];

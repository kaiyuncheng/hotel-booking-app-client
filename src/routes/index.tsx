import type { RouteObject } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/home';

import SignLayout from '@/components/SignLayout';
import SignIn from '@/pages/signIn';
import SignUp from '@/pages/signUp';
import ForgetPassword from '@/pages/forgetPassword';
import NotFound from '@/pages/notFound';

import Rooms from '@/pages/rooms';
import Room from '@/pages/rooms/Room';
import Booking from '@/pages/rooms/Booking';

import UserLayout from '@/components/UserLayout';
import User from '@/pages/user';
import Orders from '@/pages/user/Orders';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/rooms',
        element: <Rooms />,
        children: [
          { path: '/rooms/:id', element: <Room /> },
          { path: '/rooms/:id/booking', element: <Booking /> },
        ],
      },
      {
        path: '/user',
        element: <UserLayout />,
        children: [
          { index: true, element: <User /> },
          { path: '/user/orders', element: <Orders /> },
        ],
      },
      {
        path: '/sign-in',
        element: <SignLayout />,
        children: [{ index: true, element: <SignIn /> }],
      },
      {
        path: '/sign-up',
        element: <SignLayout />,
        children: [{ index: true, element: <SignUp /> }],
      },
      {
        path: '/forget-password',
        element: <ForgetPassword />,
        children: [],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    children: [],
  },
];

export default routes;

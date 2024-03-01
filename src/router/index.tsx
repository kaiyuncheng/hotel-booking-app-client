import { createHashRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/home';
import AuthOutlet from '@/components/AuthOutlet';

import SignLayout from '@/components/SignLayout';
import SignIn from '@/pages/signIn';
import SignUp from '@/pages/signUp';
import ForgetPassword from '@/pages/forgetPassword';
import NotFound from '@/pages/notFound';

import Rooms from '@/pages/rooms';
import Room from '@/pages/room';
import Booking from '@/pages/booking';

import UserLayout from '@/components/UserLayout';
import User from '@/pages/user';
import Orders from '@/pages/user/Orders';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/rooms',
        children: [
          { index: true, element: <Rooms /> },
          { path: '/rooms/:id', element: <Room /> },
          {
            path: '/rooms/:id/booking',
            element: (
              <AuthOutlet>
                <Booking />
              </AuthOutlet>
            ),
          },
        ],
      },
      {
        path: '/user',
        element: (
          <AuthOutlet>
            <UserLayout />
          </AuthOutlet>
        ),
        children: [
          { index: true, element: <User /> },
          { path: '/user/orders', element: <Orders /> },
        ],
      },
      {
        path: '/sign-in',
        element: (
          <AuthOutlet>
            <SignLayout />
          </AuthOutlet>
        ),
        children: [{ index: true, element: <SignIn /> }],
      },
      {
        path: '/sign-up',
        element: (
          <AuthOutlet>
            <SignLayout />
          </AuthOutlet>
        ),
        children: [{ index: true, element: <SignUp /> }],
      },
      {
        path: '/forget-password',
        element: (
          <AuthOutlet>
            <SignLayout />
          </AuthOutlet>
        ),
        children: [{ index: true, element: <ForgetPassword /> }],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
    children: [],
  },
]);

export default router;

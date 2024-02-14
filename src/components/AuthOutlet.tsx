import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '@/store/slices/authSlice';

type Props = {
  children: ReactNode;
};

const AuthOutlet = ({ children }: Props) => {
  const token = useSelector(selectToken);
  const location = useLocation();
  const isSignInOrSignUp = location.pathname === '/sign-in' || location.pathname === '/sign-up';

  if (token) {
    return isSignInOrSignUp ? <Navigate to="/" state={{ from: location }} /> : children;
  } else {
    return isSignInOrSignUp ? children : <Navigate to="/sign-in" state={{ from: location }} />;
  }
};

export default AuthOutlet;

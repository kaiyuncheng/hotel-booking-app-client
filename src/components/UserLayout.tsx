import { Link, Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/user">User Editing</Link>
          </li>
          <li>
            <Link to="/user/orders">Orders</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default UserLayout;

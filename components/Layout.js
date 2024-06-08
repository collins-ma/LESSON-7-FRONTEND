import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            {/* Common layout components like headers, footers, etc. */}
            <Outlet />
        </div>
    );
}

export default Layout;

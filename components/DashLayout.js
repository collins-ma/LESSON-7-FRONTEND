import { Outlet } from 'react-router-dom';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const DashLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <DashHeader />
            <main className="flex-grow container mx-auto p-4">
                <Outlet />
            </main>
            <DashFooter />
        </div>
    );
}

export default DashLayout;

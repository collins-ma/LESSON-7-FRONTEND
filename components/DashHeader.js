

import { Link } from 'react-router-dom';

const DashHeader = () => {
    const content = (
        <header className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/dash" className="text-white">
                    <h1 className="text-3xl font-bold">techNotes</h1>
                </Link>
                <nav className="space-x-4">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    );

    return content;
};

export default DashHeader;

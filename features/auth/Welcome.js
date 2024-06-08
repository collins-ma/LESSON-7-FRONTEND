import { Link } from "react-router-dom";

const Welcome = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const content = (
        <section className="min-h-screen flex flex-col items-center justify-center bg-sky-900 p-6">
            <p className="text-gray-200 text-lg mb-4">{today}</p>
            <h1 className="text-4xl font-bold text-white mb-8">Welcome!</h1>
            <div className="space-y-4">
                <p>
                    <Link to="/dash/notes" className="text-blue-300 hover:underline">
                        View technotes
                    </Link>
                </p>
                <p><Link to="/dash/notes/new">Add New techNote</Link></p>

                <p>
                    <Link to="/dash/users" className="text-blue-300 hover:underline">
                        View user settings
                    </Link>
                </p>
                <p><Link to="/dash/users/new">Add New User</Link></p>
            </div>
        </section>
    );
    return content;
}

export default Welcome;
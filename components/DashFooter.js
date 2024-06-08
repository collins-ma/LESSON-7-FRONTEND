import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const onGoHomeClicked = () => navigate('/dash');

    let goHomeButton = null;

    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                title="home"
                onClick={onGoHomeClicked}
                className="text-white hover:text-gray-300"
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        );
    }

    const content = (
        <footer className="fixed bottom-0 left-0 bg-gray-800 text-white p-4 flex items-center space-x-4">
            {goHomeButton}
            <div>
                <p className="text-sm">Current User:</p>
                <p className="text-sm">Status:</p>
            </div>
        </footer>
    );

    return content;
};

export default DashFooter;
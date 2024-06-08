
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, { isLoading,  isError, error }] = useSendLogoutMutation()

    // useEffect(() => {
    //     if (isSuccess) {
    //         navigate("/"); // Add { replace: true } to replace the current entry in the history stack
    //     }
    // }, [isSuccess, navigate]);
    const onLockOutClicked=()=>{
        sendLogout()
        navigate("/")



    }
    

    if (isLoading) return <p>Logging Out...</p>
    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "sm:flex-col"
    }

    const logoutButton = (
        <button
            className="text-white p-2 hover:bg-red-600 transition-colors duration-300"
            title="Logout"
            onClick={onLockOutClicked}
        >
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        </button>
    )

    const content = (
        <header className="bg-gray-800 p-4 shadow-md">
            <div className={`flex justify-between items-center ${dashClass}`}>
                <Link to="/dash">
                    <h1 className="text-2xl font-bold text-white">techNotes</h1>
                </Link>
                <nav className="flex items-center space-x-4">
                    {logoutButton}
                </nav>
            </div>
        </header>
    )

    return content
}

export default DashHeader

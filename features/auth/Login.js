
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "text-red font-semibold" : "hidden"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <header className="mb-6">
                <h1 className="text-3xl font-bold">Employee Login</h1>
            </header>
            <main className="w-full max-w-sm bg-white p-6 rounded shadow-md">
                <p ref={errRef} className={`${errClass} mb-4`} aria-live="assertive">{errMsg}</p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                        />
                    </div>
                    
                    <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Sign In</button>
                </form>
            </main>
            <footer className="mt-6">
                <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login


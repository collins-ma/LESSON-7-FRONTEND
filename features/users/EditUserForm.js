
import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const EditUserForm = ({user}) => {
    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)

    }

    const onActiveChanged = () => setActive(prev => !prev)


    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }


    const errClass = (isError || isDelError) ? "text-red-600 font-bold mb-4" : "hidden";
const validUserClass = !validUsername ? 'border border-red-600' : '';
const validPwdClass = password && !validPassword ? 'border border-red-600' : '';
const validRolesClass = !Boolean(roles.length) ? 'border border-red-600' : '';

const errContent = (error?.data?.message || delerror?.data?.message) ?? '';

const content = (
    <>
        <p className={errClass}>{errContent}</p>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit User</h2>
                <div className="space-x-2">
                    <button
                        className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                        title="Save"
                        onClick={onSaveUserClicked}
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    <button
                        className="p-2 bg-red-500 text-white rounded"
                        title="Delete"
                        onClick={onDeleteUserClicked}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>

            <label className="block font-medium" htmlFor="username">
                Username: <span className="text-sm text-gray-600">[3-20 letters]</span>
            </label>
            <input
                className={`w-full p-2 border rounded ${validUserClass}`}
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={onUsernameChanged}
            />

            <label className="block font-medium" htmlFor="password">
                Password: <span className="text-sm text-gray-600">[empty = no change]</span> <span className="text-sm text-gray-600">[4-12 chars incl. !@#$%]</span>
            </label>
            <input
                className={`w-full p-2 border rounded ${validPwdClass}`}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChanged}
            />

            <label className=" font-medium flex items-center" htmlFor="user-active">
                ACTIVE:
                <input
                    className="ml-2"
                    id="user-active"
                    name="user-active"
                    type="checkbox"
                    checked={active}
                    onChange={onActiveChanged}
                />
            </label>

            <label className="block font-medium" htmlFor="roles">
                ASSIGNED ROLES:
            </label>
            <select
                id="roles"
                name="roles"
                className={`w-full p-2 border rounded ${validRolesClass}`}
                multiple={true}
                size="3"
                value={roles}
                onChange={onRolesChanged}
            >
                {options}
            </select>
        </form>
    </>
);
















  return content
   
}

export default EditUserForm


import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(["Employee"]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess) {
            setUsername('');
            setPassword('');
            setRoles([]);
            navigate('/dash/users');
        }
    }, [isSuccess, navigate]);

    const onUsernameChanged = e => setUsername(e.target.value);
    const onPasswordChanged = e => setPassword(e.target.value);

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, // HTMLCollection 
            (option) => option.value
        );
        setRoles(values);
    };

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewUser({ username, password, roles });
        }
    };

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}
            >{role}</option>
        );
    });

    const errClass = isError ? "text-red-600 font-bold" : "hidden";
    const validUserClass = !validUsername ? 'border border-red-600' : '';
    const validPwdClass = !validPassword ? 'border border-red-600' : '';
    const validRolesClass = !Boolean(roles.length) ? 'border border-red-600' : '';

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="space-y-4" onSubmit={onSaveUserClicked}>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">New User</h2>
                    <div className="space-x-2">
                        <button
                            className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
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
                    Password: <span className="text-sm text-gray-600">[4-12 chars incl. !@#$%]</span>
                </label>
                <input
                    className={`w-full p-2 border rounded ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

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

    return content;
}

export default NewUserForm;
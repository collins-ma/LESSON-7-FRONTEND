import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users?.[0]?.id || '')  

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "text-red-600 font-bold mb-4" : "hidden"
    const validTitleClass = !title ? "border-red-600" : ''
    const validTextClass = !text ? "border-red-600" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="space-y-4" onSubmit={onSaveNoteClicked}>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">New Note</h2>
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
                <label className="block font-medium" htmlFor="title">
                    Title:
                </label>
                <input
                    className={`w-full p-2 border rounded ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="block font-medium" htmlFor="text">
                    Text:
                </label>
                <textarea
                    className={`w-full p-2 border rounded ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="block font-medium" htmlFor="username">
                    ASSIGNED TO:
                </label>
                <select
                    id="username"
                    name="username"
                    className="w-full p-2 border rounded"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>
            </form>
        </>
    )

    return content
}

export default NewNoteForm

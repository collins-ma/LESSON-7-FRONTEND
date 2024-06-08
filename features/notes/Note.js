import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";



const Note = ({noteId}) => {
    const note=useSelector(state=>selectNoteById(state, noteId))
    const navigate=useNavigate()

    if(note){
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)


        return (
            <tr className="bg-white hover:bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {note.completed
                  ? <span className="text-green-600 font-semibold">Completed</span>
                  : <span className="text-red-600 font-semibold">Open</span>
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{created}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{updated}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{note.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.username}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={handleEdit}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </td>
            </tr>
          );
        

        






    }
    else return null
  
  
}

export default Note

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";



const User = ({userId}) => {
    const user=useSelector(state=>selectUserById(state, userId))
    const navigate=useNavigate()

    if(user){
        const handleEdit=()=>navigate(`/dash/users/${userId}`)

        const userRoles=user.roles.toString().replaceAll(',', ',')

        const cellStatus = user.active ? '' : 'text-gray-400 italic';

  return (
    <tr className="bg-white hover:bg-gray-100 border-b">
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${cellStatus}`}>
        {user.username}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${cellStatus}`}>
        {userRoles}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm ${cellStatus}`}>
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
    else{
        return null


    } 
 

}

export default User

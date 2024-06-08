import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
const NotesList= () => {
  const{
    data:notes,
    isLoading,
    isSuccess,
    isError,
    error



  }=useGetNotesQuery(null, {
    pollingInterval:15000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
   
   

  })

  let content

  if(isLoading) content=<p>Loading..</p>

  if (isError) {
    content = (
      <p className={isError ? "text-red-500 font-bold" : "hidden"}>
        {error?.data?.message}
      </p>
    );
  }
  if (isSuccess) {
    const { ids } = notes

    const tableContent = ids?.length
        ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
        : null

        const content=(
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Updated
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Owner
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableContent}
          </tbody>
        </table>
      );
    



        

  return content
}
}

export default NotesList

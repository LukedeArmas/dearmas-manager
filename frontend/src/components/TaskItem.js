import { Link } from 'react-router-dom'

const TaskItem = ({ task }) => {
  return (
    // <div className="ticket">
    //     <div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
    //     <div>{task.product}</div>
    //     <div className={`status status-${task.status}`}>
    //         {task.status}
    //     </div>
    //     <Link to={`/tasks/${task._id}`} className='btn btn-reverse btn-sm' >
    //         View
    //     </Link>
    // </div>
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {new Date(task.createdAt).toLocaleDateString('en-Us')}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {task.product}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full bg-black status-${task.status}`}></div> <span>{task.status.charAt(0).toUpperCase() + task.status.substring(1,task.status.length)}</span>
                </div>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link to={`/tasks/${task._id}`} className="btn whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md font-medium text-white bg-indigo-800 hover:bg-indigo-900" >
                  View
                </Link>
              </td>
            </tr>
  )
}
export default TaskItem
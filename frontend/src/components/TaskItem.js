import { Link } from 'react-router-dom'

const TaskItem = ({ task, prevUrl }) => {
  return (
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
                <Link to={`/tasks/${task._id}`}
                  state={{ prevUrl: prevUrl }}
                  className="menu-btn inline-flex justify-center items-center btn status-open text-white  text-sm px-4 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-1"
                  type="button"
                  >
                    <span className='whitespace-nowrap flex-none'>View</span>
                </Link>
              </td>
            </tr>
  )
}
export default TaskItem
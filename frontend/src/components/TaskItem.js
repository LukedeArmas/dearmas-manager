import { Link } from 'react-router-dom'
import Tasks from '../pages/Tasks'

const TaskItem = ({ task }) => {
  return (
    <div className="ticket">
        <div>{new Date(task.createdAt).toLocaleString('en-US')}</div>
        <div>{task.product}</div>
        <div className={`status status-${task.status}`}>
            {task.status}
        </div>
        <Link to={`/tasks/${task._id}`} className='btn btn-reverse btn-sm' >
            View
        </Link>
    </div>
  )
}
export default TaskItem
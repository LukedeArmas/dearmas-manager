import { useSelector, useDispatch } from 'react-redux'
import taskSlice, { getTasks, reset } from '../features/tasks/taskSlice.js'
import Back from '../components/Back.js'
import TaskItem from '../components/TaskItem.js';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from 'react'

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
`;

const Tasks = () => {
    const { tasks, isSuccess, isLoading} = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    // Need two separate useEffects otherwise tasks/pending and tasks/fulfilled runs twice for some reason
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])

    if (isLoading) {
        return <ClipLoader css={override} size={150} />
    }
    return (
        <>
        <Back url={'/'} />
            <h1>Tasks</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </div>
        </>
    )
}
export default Tasks
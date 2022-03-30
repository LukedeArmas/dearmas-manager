import { useSelector, useDispatch } from 'react-redux'
import { getTasks, reset } from '../features/tasks/taskSlice.js'
import TaskItem from '../components/TaskItem.js';
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from 'react'

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5rem;
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
        return <ClipLoader color='#3730a3' css={override} size={250} />
        
    }
    return (
        <>
            <section className="heading mt-6">
                <h1 className='text-3xl'>Tickets</h1>
            </section>
    <div className="flex flex-col max-w-[900px] mx-auto mb-10">
        <div className="overflow-auto h-60 sm:h-60 md:h-60 xl:h-72 2xl:h-96 only-x-scrollbar shadow-lg rounded-lg">
            <div className="py-2 inline-block min-w-full ">
                <div className="overflow-x-auto border border-y-0 border-gray-100">
                    <table className="min-w-full">
                <thead className="bg-white border-b">
                    <tr>
                    <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">
                        Date
                    </th>
                    <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">
                        Product
                    </th>
                    <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">
                        Status
                    </th>
                    <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-center">
                        Options
                    </th>
                    </tr>
                </thead>
                <tbody>
                        {tasks.map((task) => (
                            <TaskItem key={task._id} task={task} />
                        ))}
                </tbody>
                </table>
                </div>
            </div>
        </div>
    </div> 
        </>
    )
}
export default Tasks
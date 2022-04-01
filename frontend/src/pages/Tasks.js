import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams, useLocation } from 'react-router-dom'
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
    const [searchParams] = useSearchParams()
    const { tasks, isSuccess, isLoading} = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    const location = useLocation()
    const query = searchParams.get('type') ? `?type=${searchParams.get('type')}` : ''
    
    // Need two separate useEffects otherwise tasks/pending and tasks/fulfilled runs twice for some reason
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getTasks(query))
    }, [dispatch, searchParams, query])


    if (isLoading) {
        return <ClipLoader color='#3730a3' css={override} size={250} />
        
    }
    return (
        <>
            <section className="heading mt-6">
                <h1 className='text-4xl'>{ searchParams.get('type') ? searchParams.get('type').charAt(0).toUpperCase() + searchParams.get('type').slice(1) : 'All' } Tickets</h1>
            </section>
            { !tasks.length ? (
                <p className='text-2xl mt-10'>No tickets to show</p>
            ) : (
                <div className="flex flex-col md:max-w-[550px] lg:max-w-[700px] xl:max-w-[900px] mx-auto mb-10">
                    <div className="overflow-auto h-60 sm:h-60 md:h-60 xl:h-96 2xl:h-[30rem] only-x-scrollbar shadow-lg rounded-lg">
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
                                        <TaskItem key={task._id} task={task} prevUrl={location.pathname + query} />
                                    ))}
                            </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div> 
            ) }
        </>
    )
}
export default Tasks
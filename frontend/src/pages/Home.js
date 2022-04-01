import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getTaskAmounts } from '../features/tasks/taskSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegUser, FaPlus, FaBoxOpen, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { css } from "@emotion/react"
import ClipLoader from "react-spinners/ClipLoader"

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 5rem;
`

const Home = () => {
  const { taskAmounts, isError, message, isLoading } = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTaskAmounts())
    if (isError) {
      toast.error(message)
    }
  }, [dispatch, isError, message])

  const { totalTasks, newTasks, openTasks, closedTasks } = taskAmounts

  if (isLoading) {
        return <ClipLoader color='#3730a3' css={override} size={250} />
        
    }

  return (
    <>
        <section className="heading mt-8 w-70">
            <h1 className='text-2xl text-left whitespace-nowrap'>Ticket Dashboard</h1>
        </section>
          <div className="ticket-card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 w-70 mb-8">
            <Link to='/tasks' className="ticket-card">
              <motion.div
                whileHover={{ scale: 1.1,}}
                className="rounded-lg text-left px-6 pt-8 pb-12 status-all"
              >
                  <div className="flex justify-left gap-4 mb-1">
                      <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                        <FaRegUser size={30} className='mb-1' />
                      </div>
                      <div className='flex-1'>
                        <h2 className='text-3xl font-thin'>Total Tickets</h2>
                        <p className='text-6xl font-medium'>{ totalTasks }</p>
                      </div>
                  </div>
              </motion.div>
            </Link>
            <Link to='/tasks?type=new' className="ticket-card">
              <motion.div
                whileHover={{ scale: 1.1,}}
                className="rounded-lg text-left px-6 pt-8 pb-12 status-new"
              >
                  <div className="flex justify-left gap-4 mb-1">
                      <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                        <FaPlus size={30} />
                      </div>
                      <div className='flex-1'>
                        <h2 className='text-3xl font-thin'>New Tickets</h2>
                        <p className='text-6xl font-medium'>{ newTasks }</p>
                      </div>
                  </div>
              </motion.div>
            </Link>
            <Link to='/tasks?type=open' className="ticket-card">
              <motion.div
                whileHover={{ scale: 1.1,}}
                className="rounded-lg text-left px-6 pt-8 pb-12 status-open"
              >
                  <div className="flex justify-left gap-4 mb-1">
                      <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                        <FaBoxOpen size={30} />
                      </div>
                      <div className='flex-1'>
                        <h2 className='text-3xl font-thin'>Open Tickets</h2>
                        <p className='text-6xl font-medium'>{ openTasks }</p>
                      </div>
                  </div>
              </motion.div>
            </Link>
            <Link to='/tasks?type=closed' className='ticket-card'>
              <motion.div
                whileHover={{ scale: 1.1,}}
                className="rounded-lg text-left px-6 pt-8 pb-12 status-closed"
              >
                <div className="flex justify-left gap-4 mb-1">
                    <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                      <FaCheck size={30} />
                    </div>
                    <div className='flex-1'>
                      <h2 className='text-3xl font-thin'>Closed Tickets</h2>
                      <p className='text-6xl font-medium'>{ closedTasks }</p>
                    </div>
                </div>
                </motion.div>
            </Link>
          </div>
    </>
  )
}
export default Home
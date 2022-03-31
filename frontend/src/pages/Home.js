import { Link } from 'react-router-dom'
import { FaRegUser, FaPlus, FaBoxOpen, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <>
        <section className="heading mt-8 w-70">
            <h1 className='text-2xl text-left whitespace-nowrap'>Ticket Dashboard</h1>
        </section>
          <div className="ticket-card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 w-70 mb-8">
            <motion.div
              whileHover={{ scale: 1.1,}}
              className="rounded-lg text-left px-6 pt-8 pb-12 status-all"
            >
              <Link to='/tasks' className="ticket-card">
                <div className="flex justify-left gap-4 mb-1">
                    <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                      <FaRegUser size={30} className='mb-1' />
                    </div>
                    <div className='flex-1'>
                      <h2 className='text-3xl font-thin'>Total Tickets</h2>
                      <p className='text-6xl font-medium'>5</p>
                    </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1,}}
              className="rounded-lg text-left px-6 pt-8 pb-12 status-new"
            >
              <Link to='/tasks' className="ticket-card">
                <div className="flex justify-left gap-4 mb-1">
                    <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                      <FaPlus size={30} />
                    </div>
                    <div className='flex-1'>
                      <h2 className='text-3xl font-thin'>New Tickets</h2>
                      <p className='text-6xl font-medium'>8</p>
                    </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1,}}
              className="rounded-lg text-left px-6 pt-8 pb-12 status-open"
            >
              <Link to='/tasks' className="ticket-card">
                <div className="flex justify-left gap-4 mb-1">
                    <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                      <FaBoxOpen size={30} />
                    </div>
                    <div className='flex-1'>
                      <h2 className='text-3xl font-thin'>Open Tickets</h2>
                      <p className='text-6xl font-medium'>8</p>
                    </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1,}}
              className="rounded-lg text-left px-6 pt-8 pb-12 status-closed"
            >
            <Link to='/tasks' className='ticket-card'>
              <div className="flex justify-left gap-4 mb-1">
                  <div className='flex justify-center items-center w-14 h-14 rounded-full bg-gray-700 mt-1'>
                    <FaCheck size={30} />
                  </div>
                  <div className='flex-1'>
                    <h2 className='text-3xl font-thin'>Closed Tickets</h2>
                    <p className='text-6xl font-medium'>8</p>
                  </div>
              </div>
              </Link>
              </motion.div>
            
          </div>
    </>
  )
}
export default Home
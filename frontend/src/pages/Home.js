import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <section className="heading mt-8">
            <h1 className='text-3xl'>Ticket Dashboard</h1>
            {/* <Link to='/tasks'>
            <button className="btn-home">View Tickets</button>
          </Link> */}
        </section>
          <div className="ticket-card-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-1 w-70 mb-8">
            <Link to='/tasks' className="ticket-card border-2 border-gray-200 rounded-lg text-left px-6 pt-4 pb-8">
              <div className="flex justify-left items-center gap-1.5 mb-1">
                  <div className='w-3 h-3 rounded-full bg-black status-all mb-2'></div>
                  <h2 className='text-2xl font-thin'>All Tickets</h2>
              </div>
              <p className='text-4xl font-medium'>5</p>
            </Link>
            <Link to='/tasks' className="ticket-card border-2 border-gray-200 rounded-lg text-left px-6 pt-4 pb-8">
              <div className="flex justify-left items-center gap-1.5 mb-1">
                  <div className='w-3 h-3 rounded-full bg-black status-new mb-2'></div>
                  <h2 className='text-2xl font-thin'>New</h2>
              </div>
              <p className='text-4xl font-medium'>8</p>
            </Link>
            <Link to='/tasks' className="ticket-card border-2 border-gray-200 rounded-lg text-left px-6 pt-4 pb-8">
              <div className="flex justify-left items-center gap-1.5 mb-1">
                  <div className='w-3 h-3 rounded-full bg-black status-open mb-2'></div>
                  <h2 className='text-2xl font-thin'>Open</h2>
              </div>
              <p className='text-4xl font-medium'>10</p>
            </Link>
            <Link to='/tasks' className="ticket-card border-2 border-gray-200 rounded-lg text-left px-6 pt-4 pb-8">
              <div className="flex justify-left items-center gap-1.5 mb-1">
                  <div className='w-3 h-3 rounded-full bg-black status-closed mb-2'></div>
                  <h2 className='text-2xl font-thin'>Closed</h2>
              </div>
              <p className='text-4xl font-medium'>2</p>
            </Link>
          </div>

    </>
  )
}
export default Home
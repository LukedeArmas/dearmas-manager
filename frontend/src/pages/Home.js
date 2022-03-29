import { Link } from 'react-router-dom'
import { FaTicketAlt } from 'react-icons/fa'

const Home = () => {
  return (
    <>
        <section className="heading mt-8">
            <h1>Ticket Summary</h1>
        </section>
          <Link to='/tasks'>
            <button className="btn-home">View Tickets</button>
          </Link>
        
        
    </>
  )
}
export default Home
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

const Home = () => {
  return (
    <>
        <section className="heading">
            <h1>How can we help you?</h1>
            <p>Please pick an option below</p>
        </section>

        <Link to='/new-task' className='btn btn-reverse btn-block'>
            <FaQuestionCircle /> Create Ticket
        </Link>
        <Link to='/tasks' className='btn btn-block'>
            <FaTicketAlt /> View Tickets
        </Link>
    </>
  )
}
export default Home
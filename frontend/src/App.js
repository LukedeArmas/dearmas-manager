import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Header from './components/Header.js'


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App

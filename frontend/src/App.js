import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import Header from './components/Header.js'
import CreateTask from './pages/CreateTask.js' 
import PrivateRoute from './components/PrivateRoute.js'
import Tasks from './pages/Tasks.js'
import Task from './pages/Task.js'


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
          <Route path='/new-task' element={<PrivateRoute />}>
            <Route path='/new-task' element={<CreateTask />} />
          </Route>
          <Route path='/tasks' element={<PrivateRoute />}>
            <Route path='/tasks' element={<Tasks />} />
          </Route>
          <Route path='/tasks/:taskId' element={<PrivateRoute />}>
            <Route path='/tasks/:taskId' element={<Task />} />
          </Route>
        </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App

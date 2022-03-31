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
        <div className="grid place-items-center h-full bg-indigo-900">
        <div className="w-11/12 md:w-10/12 mx-auto px-4 text-center bg-white rounded-lg h-5/6 overflow-auto no-scrollbar drop-shadow-2xl">
          <Header />
          <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Home />} />
          </Route>
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
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App
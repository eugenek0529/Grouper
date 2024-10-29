import './App.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;  

import {
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider,  
  Route 
} from 'react-router-dom'; 

//pages 
import HomePage from './pages/HomePage/HomePage';
import Proejcts from './pages/Projects/Projects';
import Community from './pages/Community/Community';
import Portfolio from './pages/Portfolio/Portfolio';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';



// layouts
import RootLayout from './layouts/RootLayout/RootLayout';



// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/projects" element={<Proejcts />} />
      <Route path="/community" element={<Community />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      {
        // TODO
        // O - add signup and login route and pages
        // signup and login handler, connect backend
        // add layout to projects
      }
    </Route> 
  )
)


function App() {
 
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

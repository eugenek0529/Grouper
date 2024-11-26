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
import Projects from './pages/Projects/Projects';
import Portfolio from './pages/Portfolio/Portfolio';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Groups from './pages/Groups/Groups';



// layouts
import RootLayout from './layouts/RootLayout/RootLayout';
import BrowsePortfolio from './pages/BrowsePortfolio/BrowsePortfolio';



// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/groups" element={<Groups />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/browsePortfolio/:userId' element={<BrowsePortfolio />} />
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

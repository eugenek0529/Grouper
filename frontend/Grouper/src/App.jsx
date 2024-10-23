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

    </Route> 
  )
)

import './App.css'

function App() {
 
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

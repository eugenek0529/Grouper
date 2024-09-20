import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage/HomePage';
import Proejcts from './pages/Projects/Proejcts';
import Community from './pages/Community/Community';
import Portfolio from './pages/Portfolio/Portfolio';
import Navbar from './components/Navbar/Navbar';

import './App.css'

function App() {
 
  return (
    <div className='app'>
      <Navbar />
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Proejcts />} />
          <Route path="/community" element={<Community />} />
          <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  )
}

export default App

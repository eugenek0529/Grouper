import React from 'react'
import './homepage.css'
import Hero from '../../components/Hero/Hero'
import Discover from '../../components/Discover/Discover'


function HomePage() {
  return (
    <main className='homepage'>
        <Hero />
        <Discover />

    </main>
  )
}

export default HomePage

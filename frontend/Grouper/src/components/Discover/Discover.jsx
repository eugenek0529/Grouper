import React from 'react'
import './discover.css'

function Discover() {
  return (
    <div className='discover'>
        <h1>Discover projects</h1>
        <div className="discover-list">
            {[...Array(12)].map((_, index) => (
              <div key={index} className='project-card'>
                <h3>Project {index + 1}</h3>
                <p>Project description goes here...</p>
              </div>
            ))}
        </div>

        <a href="/projects">Browse more</a>
    </div>
  )
}

export default Discover

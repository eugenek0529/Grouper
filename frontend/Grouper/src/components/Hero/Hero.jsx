import React from 'react'
import tags from "../../assets/jsonFiles/tags-sample.json"
import './hero.css'


function Hero() {
  return (
    <div className='hero'>
      <h1 className='hero-sentence'>Find your project mate</h1>
        

        <div className="tags">
            {
                tags.map((tag, index) => (
                    <span key={index} className='tag'>{tag}</span>
                ))
            }
        </div>

    </div>
  )
}

export default Hero

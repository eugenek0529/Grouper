import React from 'react'
import axios from 'axios'
import './groups.css'; 


export default function Groups() {
  return (
    <div className='groups'>
      <div className="list-top">
        <h3 className="top-list">Joined Groups</h3>
        <div className="scroll-container">
            <div className="top-groups">

            </div>
        </div>
      </div>


      <div className="list-bottom">

      </div>
    </div>
  )
}

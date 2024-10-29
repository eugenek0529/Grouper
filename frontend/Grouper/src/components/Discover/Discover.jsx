import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './discover.css';
import ProjectPost from '../ProjectPost/ProjectPost';

function Discover() {

  const [displayPost, setDisplayPost] = useState(false); 

  const openPost = () => setDisplayPost(true);
  const closePost = () => setDisplayPost(false);
  

  return (
    <div className='discover'>
        <h1>Discover projects</h1>
        <ul className="discover-list">
            {[...Array(12)].map((_, index) => (
              <li key={index} className='project-card' onClick={openPost}>
                <span className='status'>Status</span>
                <h3 className='title'>Project {index + 1}</h3>
                <span className='postedDate'>Posted date</span>
                <div className="skills">
                  <div className="skill">skill1</div>
                  <div className="skill">skill2</div>
                  <div className="skill">skill3</div>
                </div>
                <div className="divider"></div>
                <div className="bottom">
                  <span className='location'>location</span>
                  <button onClick={openPost} className='apply-btn'>Apply</button>
                </div>
              </li>
            ))}
        </ul>
        <NavLink to="/projects">Browse more</NavLink>

        {
          displayPost && <ProjectPost closePost={closePost} />
        }
    </div>
  )
}

export default Discover;

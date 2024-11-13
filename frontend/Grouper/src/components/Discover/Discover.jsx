import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './discover.css';
import ProjectPost from '../ProjectPost/ProjectPost';



function Discover() {

  const [displayPost, setDisplayPost] = useState(false); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);


  const openPost = (post) => {
    setSelectedPost(post);
    setDisplayPost(true);
  };
  const closePost = () => setDisplayPost(false);
  

  // useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/getPosts'); 
        setPosts(response.data); // will return array of all posts
      } catch (error) {
        console.log('failed to fetch posts')
      }
    }
    // posts will be fetched when reload
    fetchPosts();

  }, []); 


  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'status-open';
      case 'in-progress':
        return 'status-in-progress';
      case 'closed':
        return 'status-closed';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats to "YYYY-MM-DD" based on locale
  };




  return (
    <div className='discover'>
        <h1>Discover projects</h1>

        
        <ul className="discover-list">
            {posts.map((post) => (
              <li key={post._id} className='project-card' onClick={() => openPost(post)}>
                <span className={`status ${getStatusClass(post.project_status)}`}>
                  {post.project_status || "Status"}
                </span>
                <h3 className='title'>{post.title || "Project"}</h3>
                <span className="postedDate">{formatDate(post.createdAt)}</span>
                <div className="skills">
                  {post.tags.map((tag, index) => (
                    <div key={index} className="skill">{tag}</div>
                  ))}
                </div>
                <div className="divider"></div>
                <div className="bottom">
                  <span className='location'>{post.location || "Location"}</span>
                  <button onClick={openPost} className='apply-btn'>Apply</button>
                </div>
              </li>
            ))}
        </ul>
        <NavLink to="/projects">Browse more</NavLink>

        {
          displayPost && <ProjectPost post={selectedPost} closePost={closePost} />
        }
    </div>
  )
}

export default Discover;

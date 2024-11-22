import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProjectPost from '../../components/ProjectPost/ProjectPost';
import CreateProjectPost from '../../components/CreateProjectPost/CreateProjectPost';
import { AuthContext } from '../../contexts/authContext';
import './projects.css';

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayPost, setDisplayPost] = useState(false);
  const [displayCreatePost, setDisplayCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [location, setLocation] = useState('');
  const [meetingStyle, setMeetingStyle] = useState('');
  const [status, setStatus] = useState('');

  const { user } = useContext(AuthContext);
  let currentUser = user ? user._id : null;

  // Available options
  const AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS',
    'Docker', 'Kubernetes', 'Machine Learning', 'AI',
    'DevOps', 'UI/UX', 'Mobile Development', 'Cloud Computing'
  ];

  const MEETING_STYLES = ['online', 'in-person', 'hybrid'];
  const PROJECT_STATUSES = ['open', 'in-progress', 'closed'];

  // Fetch posts with filters
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Build query parameters based on filters
        const queryParams = new URLSearchParams();
        
        if (searchTerm) queryParams.set('title', searchTerm);
        if (selectedSkills.length > 0) queryParams.set('tags', selectedSkills.join(','));
        if (location) queryParams.set('location', location);
        if (meetingStyle) queryParams.set('meetingStyle', meetingStyle.toLowerCase());
        if (status) queryParams.set('project_status', status);

        const response = await axios.get(`http://localhost:8000/api/posts/getPosts?${queryParams}`);
        setPosts(response.data);
      } catch (error) {
        console.log('Failed to fetch posts:', error);
      }
    };

    fetchPosts();
  }, [searchTerm, selectedSkills, location, meetingStyle, status]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The useEffect will trigger the fetch with updated filters
  };

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSearchTerm('');
    setLocation('');
    setMeetingStyle('');
    setStatus('');
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setDisplayPost(true);
  };
  
  const closePost = () => {
    setDisplayPost(false);
    setSelectedPost(null);
  };

  const openCreatePost = () => setDisplayCreatePost(true);
  const closeCreatePost = () => setDisplayCreatePost(false);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
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
    return date.toLocaleDateString();
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <div className="header-content">
          <h1>Browse Projects</h1>
          <button 
            onClick={() => {
              if (currentUser) {
                openCreatePost();
              } else {
                alert('Please login to post your idea');
              }
            }}
            className="create-project-btn">
            Create Project
          </button>
        </div>
        <div className="filters-container">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            {/* Skills Dropdown */}
            <div className="skills-filter">
              <button 
                type="button"
                className="skills-dropdown-btn"
                onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
              >
                Skills ({selectedSkills.length})
                <span className={`arrow ${showSkillsDropdown ? 'up' : 'down'}`}></span>
              </button>
              
              {showSkillsDropdown && (
                <div className="skills-dropdown">
                  <div className="skills-dropdown-header">
                    <span>Select Skills</span>
                    <button 
                      type="button" 
                      onClick={() => setSelectedSkills([])}
                      className="clear-skills"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="skills-list">
                    {AVAILABLE_SKILLS.map(skill => (
                      <label key={skill} className="skill-checkbox">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Meeting Style Select */}
            <select
              value={meetingStyle}
              onChange={(e) => setMeetingStyle(e.target.value)}
              className="filter-select"
            >
              <option value="">Meeting Style</option>
              {MEETING_STYLES.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>

            {/* Status Select */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">Status</option>
              {PROJECT_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {/* Active Filters */}
          {(selectedSkills.length > 0 || searchTerm || location || meetingStyle || status) && (
            <div className="active-filters">
              {selectedSkills.map(skill => (
                <span key={skill} className="filter-tag">
                  {skill}
                  <button onClick={() => toggleSkill(skill)}>×</button>
                </span>
              ))}
              {(selectedSkills.length > 0 || searchTerm || location || meetingStyle || status) && (
                <button onClick={clearFilters} className="clear-all">
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <ul className="projects-grid">
        {posts.map((post) => (
          <li 
            key={post._id} 
            className="project-card" 
            onClick={() => openPost(post)}
          >
            <span className={`status ${getStatusClass(post.project_status)}`}>
              {post.project_status || "Status"}
            </span>
            <h3 className="title">{post.title}</h3>
            <span className="postedDate">Posted {formatDate(post.createdAt)}</span>
            <div className="skills">
              {post.tags?.map((tag, index) => (
                <div key={index} className="skill">{tag}</div>
              ))}
            </div>
            <div className="divider"></div>
            <div className="bottom">
              <span className="location">{post.location || "Remote"}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openPost(post);
                }} 
                className="apply-btn"
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>

      {displayPost && (
        <ProjectPost post={selectedPost} closePost={closePost} />
      )}

      {displayCreatePost && (
        <CreateProjectPost closeCreatePost={closeCreatePost} userId={currentUser} />
      )}
    </div>
  );
}

export default Projects;
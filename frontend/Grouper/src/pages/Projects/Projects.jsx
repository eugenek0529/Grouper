import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectPost from '../../components/ProjectPost/ProjectPost';
import CreateProjectPost from '../../components/CreateProjectPost/CreateProjectPost';
import './projects.css';

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayPost, setDisplayPost] = useState(false);
  const [displayCreatePost, setDisplayCreatePost] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  
  // Get current page from URL or default to 1
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const ITEMS_PER_PAGE = 12;
  const TOTAL_ITEMS = 50;
  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  // Placeholder available skills
  const AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS',
    'Docker', 'Kubernetes', 'Machine Learning', 'AI',
    'DevOps', 'UI/UX', 'Mobile Development', 'Cloud Computing'
  ];

  const handlePageChange = (newPage) => {
    setSearchParams({ 
      page: newPage.toString(),
      ...(searchTerm && { search: searchTerm }),
      ...(selectedSkills.length > 0 && { skills: selectedSkills.join(',') })
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ 
      page: '1',
      ...(searchTerm && { search: searchTerm }),
      ...(selectedSkills.length > 0 && { skills: selectedSkills.join(',') })
    });
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
    setSearchParams({ page: '1' });
  };

  const openPost = () => setDisplayPost(true);
  const closePost = () => setDisplayPost(false);
  const openCreatePost = () => setDisplayCreatePost(true);
  const closeCreatePost = () => setDisplayCreatePost(false);

  // Generate placeholder projects for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = [...Array(Math.min(ITEMS_PER_PAGE, TOTAL_ITEMS - startIndex))];

  return (
    <div className="projects-container">
      <div className="projects-header">
        <div className="header-content">
          <h1>Browse Projects</h1>
          <button 
            onClick={openCreatePost}
            className="create-project-btn"
          >
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

            <button type="submit" className="search-button">
              Search
            </button>
          </form>

          {(selectedSkills.length > 0 || searchTerm) && (
            <div className="active-filters">
              {selectedSkills.map(skill => (
                <span key={skill} className="filter-tag">
                  {skill}
                  <button onClick={() => toggleSkill(skill)}>×</button>
                </span>
              ))}
              {(selectedSkills.length > 0 || searchTerm) && (
                <button onClick={clearFilters} className="clear-all">
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>



      <ul className="projects-grid">
        {currentProjects.map((_, index) => (
          <li 
            key={startIndex + index} 
            className="project-card" 
            onClick={openPost}
          >
            <span className="status">Active</span>
            <h3 className="title">Project {startIndex + index + 1}</h3>
            <span className="postedDate">Posted 2024-01-01</span>
            <div className="skills">
              <div className="skill">React</div>
              <div className="skill">Node.js</div>
              <div className="skill">MongoDB</div>
            </div>
            <div className="divider"></div>
            <div className="bottom">
              <span className="location">Remote</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openPost();
                }} 
                className="apply-btn"
              >
                Apply
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>

      {displayPost && (
        <ProjectPost closePost={closePost} />
      )}

      {displayCreatePost && (
        <CreateProjectPost closeCreatePost={closeCreatePost} />
      )}
    </div>
  );
}

export default Projects;
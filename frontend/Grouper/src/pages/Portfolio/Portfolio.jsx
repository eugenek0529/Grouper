import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import axios from 'axios';
import './portfolio.css';

function Portfolio() {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [joinedProjects, setJoinedProjects] = useState([]);
    const [portfolioData, setPortfolioData] = useState({
        location: '',
        contactInfo: '',
        description: '',
        skills: [],
        links: [
            
        ]
    });

    const AVAILABLE_SKILLS = [
        'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
        'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS',
        'Docker', 'Kubernetes', 'Machine Learning', 'AI',
        'DevOps', 'UI/UX', 'Mobile Development', 'Cloud Computing'
    ];

    const MAX_SKILLS = 5;
    const MAX_LINKS = 5;



    useEffect(() => {
      const fetchJoinedProjects = async () => {
          if (!user?._id) return;
          
          try {
              const response = await axios.get(`http://localhost:8000/api/posts/${user._id}/groups`);
              if (response.data.joined) {
                  setJoinedProjects(response.data.joined);
              }
          } catch (error) {
              console.error('Error fetching joined projects:', error);
          }
      };

      fetchJoinedProjects();
      }, [user?._id]);


    useEffect(() => {
      const fetchPortfolioData = async () => {
        if(!user) return; 

        try {
          const response = await axios.get(`http://localhost:8000/api/portfolio/${user._id}`);
          
        //console.log(response.data)

          setPortfolioData({
            location: response.data.location || '',
            contactInfo: response.data.contactInfo || '', 
            description: response.data.description || '', 
            skills: response.data.skills || [],
            links: response.data.links || [],
        });
        } catch (error) {
          console.error('Error fetching portfolio data:', error);
          alert('Failed to fetch portfolio data.');
        }
      }
      fetchPortfolioData();
    }, [user])




    const handleEdit = () => {
        setIsEditing(true);
    };

    // HANDLE UPDATE PORTFOLIO
    const handleSave = async () => {
      console.log("Portfolio ID:", user.portfolioId);

        
        try {

            const payload = {
              location: portfolioData.location,
              contactInfo: portfolioData.contactInfo,
              skills: portfolioData.skills,
              links: portfolioData.links.map(link => ({ 
                title: link.title, 
                url: link.url }))
,
          };


          const response = await axios.put(
            `http://localhost:8000/api/portfolio/update/${user.portfolioId}`,
             payload
          )

          if (response.status === 200) {
            // if porfolio is successfully updated
            alert('Successfully updated the portfolio')
            setIsEditing(false);
          }
        } catch (error) {
          if (error.response) {
            alert(error.response.data.error || 'Failed to update the portfolio');
          } else {
            alert('An error occured, please try again')
          }
        }
      
       
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleAddSkill = (skill) => {
        if (portfolioData.skills.length < MAX_SKILLS) {
            setPortfolioData({
                ...portfolioData,
                skills: [...portfolioData.skills, skill]
            });
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setPortfolioData({
            ...portfolioData,
            skills: portfolioData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    const handleAddLink = () => {
        if (portfolioData.links.length < MAX_LINKS) {
            setPortfolioData({
                ...portfolioData,
                links: [...portfolioData.links, { title: '', url: '' }]
            });
        }
    };

    const handleRemoveLink = (index) => {
        setPortfolioData({
            ...portfolioData,
            links: portfolioData.links.filter((_, i) => i !== index)
        });
    };

    const handleLinkChange = (index, field, value) => {
      const newLinks = [...portfolioData.links];
  
      if (field === 'url' && value && !/^https?:\/\//i.test(value)) {
          value = `http://${value}`;
      }
  
      newLinks[index] = { ...newLinks[index], [field]: value };
      setPortfolioData({
          ...portfolioData,
          links: newLinks
      });
  };

    const renderSkillsSection = () => {
        if (isEditing) {
            return (
                <div className="skills-selector">
                    <div className="selected-skills">
                        {portfolioData.skills.map((skill, index) => (
                            <span key={index} className="skill-tag">
                                {skill}
                                <button onClick={() => handleRemoveSkill(skill)}>×</button>
                            </span>
                        ))}
                    </div>
                    
                    <div className="available-skills">
                        {AVAILABLE_SKILLS.map((skill, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`skill-${index}`}
                                    className="skill-toggle"
                                    checked={portfolioData.skills.includes(skill)}
                                    disabled={!portfolioData.skills.includes(skill) && portfolioData.skills.length >= MAX_SKILLS}
                                    onChange={() => {
                                        if (portfolioData.skills.includes(skill)) {
                                            handleRemoveSkill(skill);
                                        } else {
                                            handleAddSkill(skill);
                                        }
                                    }}
                                />
                                <label htmlFor={`skill-${index}`}>{skill}</label>
                            </div>
                        ))}
                    </div>
                    
                    {portfolioData.skills.length >= MAX_SKILLS && (
                        <p className="skills-limit-warning">Maximum of 5 skills reached</p>
                    )}
                </div>
            );
        }

        return (
            <div className="skills-container">
                {portfolioData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                        {skill}
                    </span>
                ))}
            </div>
        );
    };

    const renderSocialLinks = () => {
        if (isEditing) {
            return (
                <div className="links-editor">
                    {portfolioData.links.map((link, index) => (
                        <div key={index} className="link-edit-item">
                            <div className="link-inputs">
                                <input
                                    type="text"
                                    placeholder="Title (e.g., GitHub)"
                                    value={link.title}
                                    onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                                    className="link-input"
                                />
                                <input
                                    type="url"
                                    placeholder="URL (e.g., https://github.com)"
                                    value={link.url}
                                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                    className="link-input"
                                />
                            </div>
                            <button 
                                className="remove-link-btn"
                                onClick={() => handleRemoveLink(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    {portfolioData.links.length < MAX_LINKS && (
                        <button 
                            className="add-link-btn"
                            onClick={handleAddLink}
                        >
                            + Add Link
                        </button>
                    )}
                    {portfolioData.links.length >= MAX_LINKS && (
                        <p className="links-limit-warning">Maximum of 5 links reached</p>
                    )}
                </div>
            );
        }

        return (
            <div className="links-container">
                {portfolioData.links.map((link, index) => (
                    <a 
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-item"
                    >
                        {link.title}
                    </a>
                ))}
            </div>
        );
    };

    // joined projects
    const renderProjectsSection = () => {
      return (
          <div className="projects-section">
              <div className="projects-grid">
                  {joinedProjects.map((project) => (
                      <div key={project._id} className="project-card">
                          <h3 className="project-title">{project.title}</h3>
                          <p className="project-description">{project.description}</p>
                          <div className="project-details">
                              <span className="project-location">📍 {project.location}</span>
                              <span className="project-members">👥 {project.members.length} members</span>
                              <span className="project-status">Status: {project.project_status}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };


    if (!user) {
        return (
            <div className="login-message">
                <h2>Please Login to View Portfolio</h2>
                <p>You need to be logged in to access this page.</p>
            </div>
        );
    }

    return (
      <div className="portfolio-container">
          <div className="portfolio-header">
              <div className="user-info">
                  <div className="user-icon">
                      <span className="user-icon-default">👤</span>
                  </div>
                  <h1>{user.fullname}'s Portfolio</h1>
              </div>
              {!isEditing ? (
                  <button className="edit-btn" onClick={handleEdit}>
                      ✏️ Edit Portfolio
                  </button>
              ) : (
                  <div className="button-group">
                      <button className="save-btn" onClick={handleSave}>
                          💾 Save
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                          ❌ Cancel
                      </button>
                  </div>
              )}
          </div>

          <section className="section">
              <h2>Personal Information</h2>
              <div className={`info-item ${isEditing ? 'editing' : ''}`}>
                  {isEditing ? (
                      <>
                          <input 
                              type="text" 
                              value={portfolioData.location}
                              placeholder='location'
                              onChange={(e) => setPortfolioData({
                                  ...portfolioData,
                                  location: e.target.value
                              })}
                          />
                          <input 
                              type="text" 
                              value={portfolioData.contactInfo}
                              placeholder='contactInfo'
                              onChange={(e) => setPortfolioData({
                                  ...portfolioData,
                                  contactInfo: e.target.value
                              })}
                          />
                      </>
                  ) : (
                      <>
                          <p>Location: {portfolioData.location}</p>
                          <p>ContactInfo: {portfolioData.contactInfo}</p>
                      </>
                  )}
              </div>
          </section>

          <section className="section">
              <h2>Skills</h2>
              {renderSkillsSection()}
          </section>

          <section className="section">
              <h2>Social Links</h2>
              {renderSocialLinks()}
          </section>

          <section className="section">
              <h2>Projects</h2>
              {renderProjectsSection()}
          </section>
      </div>
  );
}

export default Portfolio;
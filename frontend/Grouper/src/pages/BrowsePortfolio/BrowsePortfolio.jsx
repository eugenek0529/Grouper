import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './BrowsePortfolio.css';

function BrowsePortfolio() {

    const { userId } = useParams(); 

    const [portfolioData, setPortfolioData] = useState({
        location: '',
        fullname: '', 
        contactInfo: '',
        description: '',
        skills: [],
        links: [
            
        ]
    });
    const [joinedProjects, setJoinedProjects] = useState([]); 

    useEffect(() => {
        const fetchUserPortfolioData = async () => {
            try {
                // Fetch portfolio data
                const response = await axios.get(`http://localhost:8000/api/portfolio/${userId}`);
                console.log(response.data)
                setPortfolioData({
                    location: response.data.location || '',
                    fullname: response.data.fullname || '',
                    contactInfo: response.data.contactInfo || '', 
                    description: response.data.description || '', 
                    skills: response.data.skills || [],
                    links: response.data.links || [],
                });

                // Fetch joined projects
                const projectsResponse = await axios.get(`http://localhost:8000/api/posts/${userId}/groups`);
                if (projectsResponse.data.joined) {
                    setJoinedProjects(projectsResponse.data.joined);
                }

               
            } catch (error) {
                console.error('Error fetching user portfolio:', error);
              
            }
        };

        if (userId) {
            fetchUserPortfolioData();
        }
    }, [userId]);

    const renderSkillsSection = () => {
        if (!portfolioData?.skills?.length) return null;

        return (
            <section className="section">
                <h2>Skills</h2>
                <div className="skills-container">
                    {portfolioData.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        );
    };

    const renderSocialLinks = () => {
        if (!portfolioData?.links?.length) return null;

        return (
            <section className="section">
                <h2>Social Links</h2>
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
            </section>
        );
    };

    const renderProjectsSection = () => {
        if (!joinedProjects.length) {
            return (
                <section className="section">
                    <h2>Projects</h2>
                    <div className="projects-empty">
                        <p>No projects joined yet</p>
                    </div>
                </section>
            );
        }

        return (
            <section className="section">
                <h2>Projects</h2>
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
            </section>
        );
    };





    if (!portfolioData) {
        return (
            <div className="portfolio-container">
                <p>No portfolio found for this user</p>
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
                    <h1>{portfolioData.fullname || 'User'}'s Portfolio</h1>
                </div>
            </div>

            <section className="section">
                <h2>Personal Information</h2>
                <div className="info-item">
                    <p>Location: {portfolioData.location || 'Not specified'}</p>
                    <p>Contact: {portfolioData.contactInfo || 'Not specified'}</p>
                </div>
            </section>

            {renderSkillsSection()}
            {renderSocialLinks()}
            {renderProjectsSection()}
        </div>
    );
}

export default BrowsePortfolio;
// ProjectCard.jsx
import React from 'react';
import './projectCard.css';

const ProjectCard = ({ post, onClick }) => {
  // Add console.log to debug the post data
  console.log('Post data:', post);

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

  const handleApplyClick = (e) => {
    e.stopPropagation();
    // Add your apply logic here
  };

  // Format date if needed
  const formatDate = (dateString) => {
    if (!dateString) return 'Posted date';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Safely access nested properties
  const projectTitle = post?.title || post?.projectTitle || post?.name || "Project";
  const projectStatus = post?.project_status|| "Status";
  const projectLocation = post?.location || "Location";
  const projectTags = post?.tags || post?.skills || [];
  const postedDate = formatDate(post?.createdAt || post?.postedDate);

  return (
    <li className='project-card' onClick={() => onClick?.(post)}>
      <span className={`status ${getStatusClass(projectStatus)}`}>
        {projectStatus}
      </span>
      
      <h3 className='title'>
        {projectTitle}
      </h3>
      
      <span className='postedDate'>
        {postedDate}
      </span>
      
      <div className="skills">
        {Array.isArray(projectTags) && projectTags.map((tag, index) => (
          <div key={index} className="skill">
            {typeof tag === 'object' ? tag.name || tag.label : tag}
          </div>
        ))}
      </div>
      
      <div className="divider"></div>
      
      <div className="bottom">
        <span className='location'>{projectLocation}</span>
        <button 
          className='apply-btn'
          onClick={handleApplyClick}
        >
          Apply
        </button>
      </div>
    </li>
  );
};

export default ProjectCard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateProjectPost.css';

const CreateProjectPost = ({ closeCreatePost, userId, isEditing = false, existingPost = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_status: 'open',
    meetingStyle: 'online',
    capacity: 1,
    location: '',
    tags: [], 
    creatorId: null, // added to match backend
    applicants: [], // added to match backend
    members: [] // added to match backend
  });

  useEffect(() => {
    if (isEditing && existingPost) {
      setFormData({
        title: existingPost.title,
        description: existingPost.description,
        project_status: existingPost.project_status,
        meetingStyle: existingPost.meetingStyle,
        capacity: existingPost.capacity,
        location: existingPost.location,
        tags: existingPost.tags,
        creatorId: existingPost.creatorId,
        applicants: existingPost.applicants,
        members: existingPost.members
      });
    }
  }, [isEditing, existingPost]);



  const [skillInput, setSkillInput] = useState('');

  const AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS',
    'Docker', 'Kubernetes', 'Machine Learning', 'AI',
    'DevOps', 'UI/UX', 'Mobile Development', 'Cloud Computing'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      
      if (isEditing) {
        // Update existing post
        response = await axios.put(`http://localhost:8000/api/posts/${existingPost._id}`, {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          meetingStyle: formData.meetingStyle,
          tags: formData.tags,
          capacity: formData.capacity,
          project_status: formData.project_status,
          // Preserve existing applicants and members
          applicants: formData.applicants,
          members: formData.members
        });
      } else {
        // Create new post
        response = await axios.post('http://localhost:8000/api/posts/createPost', {
          title: formData.title,
          creatorId: userId,
          description: formData.description,
          location: formData.location,
          meetingStyle: formData.meetingStyle,
          tags: formData.tags,
          capacity: formData.capacity,
          project_status: formData.project_status,
          applicants: formData.applicants,
          members: formData.members
        });
      }

      if (response.status === 200) {
        console.log(isEditing ? 'Project updated successfully:' : 'Project created successfully:', response.data);
        closeCreatePost();
      }
    } catch (error) {
      console.error(isEditing ? 'Error updating project:' : 'Error creating project:', error);
      alert(isEditing ? 'Failed to update project. Please try again.' : 'Failed to create project. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/api/posts/${existingPost._id}`);
      
      if (response.status === 200) {
        console.log('Project deleted successfully');
        closeCreatePost(); // Close the modal after successful deletion
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project. Please try again.');
    }
  };

  const addSkill = () => {
    if (skillInput && !formData.tags.includes(skillInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, skillInput]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="createPost">
        <div className="createPost-content">
          <button onClick={closeCreatePost} className="close-btn">×</button>

          <form onSubmit={handleSubmit}>
            <div className="top">
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Project Title"
                className="title"
                required
              />
              
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Location (e.g., Remote)"
                className="location"
              />
            </div>

            <div className="divider" />

            <div className="bottom">
              <div className="bottom-left">
                <h3>Project Description</h3>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter detailed project description"
                  required
                />
              </div>

              <div className="bottom-right">
                <div className="form-group">
                  <label className="category">Status</label>
                  <select
                    value={formData.project_status}
                    onChange={e => setFormData(prev => ({ ...prev, project_status: e.target.value }))}
                  >
                    <option value="Open">open</option>
                    <option value="In-progress">in-progress</option>
                    <option value="Closed">closed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="category">Meeting Style</label>
                  <select
                    value={formData.meetingStyle}
                    onChange={e => setFormData(prev => ({ ...prev, meetingStyle: e.target.value }))}
                  >
                    <option value="online">online</option>
                    <option value="in-person">in-person</option>
                    <option value="hybrid">hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="category">Capacity</label>
                  <select
                    value={formData.capacity}
                    onChange={e => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                  >
                    {[...Array(20)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="category">Required Skills</label>
                  <div className="skills-input">
                    <select
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                    >
                      <option value="">Select a skill</option>
                      {AVAILABLE_SKILLS.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                    <button type="button" onClick={addSkill} className="add-skill-btn">
                      Add
                    </button>
                  </div>
                  <div className="skills">
                    {formData.tags.map(skill => (
                      <span key={skill} className="skill">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="remove-skill"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="button-group">
                  <button type="submit" className="create-btn">
                    {isEditing ? 'Update Project' : 'Create Project'}
                  </button>
                  
                  {isEditing && (
                    <button 
                      type="button" 
                      onClick={handleDelete}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  )}
                </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPost;
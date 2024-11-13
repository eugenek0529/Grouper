import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateProjectPost.css';

const CreateProjectPost = ({ closeCreatePost, userId }) => {
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
    if (userId) {
      console.log('Logged in as', userId);
    } else {
      console.log('No user id');
    }
  }, [userId]);



  const [skillInput, setSkillInput] = useState('');

  const AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS',
    'Docker', 'Kubernetes', 'Machine Learning', 'AI',
    'DevOps', 'UI/UX', 'Mobile Development', 'Cloud Computing'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post('http://localhost:8000/api/posts/createPost', {
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

      if (response.status === 200) {
        console.log('Project created successfully:', response.data);
        closeCreatePost();
      }
    } catch (error) {
      console.error('Error creating project:', error);
      // Here you could add error handling UI feedback
      alert('Failed to create project. Please try again.');
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
                    <option value="Online">online</option>
                    <option value="In-person">in-person</option>
                    <option value="Hybrid">hybrid</option>
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

                <button type="submit" className="create-btn">
                  Create Project
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPost;
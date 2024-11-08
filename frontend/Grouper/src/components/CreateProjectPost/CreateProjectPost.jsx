import React, { useState } from 'react';
import './CreateProjectPost.css'

const CreateProjectPost = ({ closeCreatePost }) => {  // Changed from onClose to closeCreatePost
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Active',
    location: '',
    skills: [],
    requirements: '',
    compensation: '',
    deadline: '',
    creator: ''
  });

  const [skillInput, setSkillInput] = useState('');

  const AVAILABLE_SKILLS = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
    'Java', 'C++', 'MongoDB', 'PostgreSQL', 'AWS',
    'Docker', 'Kubernetes', 'Machine Learning', 'AI',
    'DevOps', 'UI/UX', 'Mobile Development', 'Cloud Computing'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      postedDate: new Date().toISOString().split('T')[0]
    };
    
    // Here you would typically send the data to your backend
    console.log('Submitting project:', projectData);
    
    // Close the modal after submission
    closeCreatePost();
  };

  const addSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
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
                value={formData.creator}
                onChange={e => setFormData(prev => ({ ...prev, creator: e.target.value }))}
                placeholder="Creator Name"
                className="creator"
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

                <h3>Requirements</h3>
                <textarea
                  value={formData.requirements}
                  onChange={e => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="Enter project requirements"
                />
              </div>

              <div className="bottom-right">
                <div className="form-group">
                  <label className="category">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="category">Compensation</label>
                  <input
                    type="text"
                    value={formData.compensation}
                    onChange={e => setFormData(prev => ({ ...prev, compensation: e.target.value }))}
                    placeholder="e.g., $50/hr, $5000 fixed"
                  />
                </div>

                <div className="form-group">
                  <label className="category">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={e => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                  />
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
                    {formData.skills.map(skill => (
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
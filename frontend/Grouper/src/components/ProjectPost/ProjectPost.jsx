import "./projectPost.css";
import { AuthContext } from '../../contexts/authContext';
import { useContext, useState } from 'react';
import CreateProjectPost from "../CreateProjectPost/CreateProjectPost";
import axios from "axios";



export default function ProjectPost({ post, closePost }) {

  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);
  let currentUser = user ? user._id : null;
  
  

  const handleApply = async () => {
    // when logged-in user click apply to post

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post._id}/apply`,
        {userId: currentUser },
      )

      if (response.status === 200) {
        // if applicant is added, alert and close the post
        alert('Successfully applied to the project!')
        closePost(); 

      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || 'Failed to apply to the project');
      } else {
        alert('An error occured, please try again')
      }
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <CreateProjectPost 
        closeCreatePost={handleCloseEdit}
        userId={currentUser}
        isEditing={true}
        existingPost={post}
      />
    );
  }


  const handleAccept = async (applicantId) => {
    console.log('from client,', currentUser)
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post._id}/applicants/${applicantId}/accept`,
        {userId: currentUser }
      );
  
      if (response.status === 200) {
        alert('Applicant accepted successfully');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to accept applicant');
    }
  };


  const handleDecline = async (applicantId) => {
    
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post._id}/applicants/${applicantId}/decline`,
        {userId: currentUser }
        
      );
  
      if (response.status === 200) {
        alert('Applicant declined successfully');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to decline applicant');
    }
  };

  return (
    <div className="projectPost" onClick={closePost}>
      <div className="projectPost-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePost}>
          x
        </button>

        <div className="top">
          <h2 className="title">{post.title}</h2>
          <span className="creator">
            {post.creatorId.fullname || "Creator ID"}
          </span>
          <span className="location">{post.location}</span>
        </div>

        <div className="divider"></div>

        <div className="bottom">
          <div className="bottom-left">
          <div className="description-section">
              <h3>Descriptions:</h3>
              <p>{post.description}</p>
            </div>
            
            {/* this is list of applicants */}
            {currentUser === post.creatorId._id && (
              <div className="applicants-section">
                <h3>Applicants:</h3>
                <div className="applicants-list">
                  {post.applicants?.length > 0 ? (
                    post.applicants.map((applicant) => (
                      <div key={applicant._id} className="applicant-item">
                        <span className="applicant-name">{applicant.fullname}</span>
                        <div className="applicant-buttons">
                          <button
                            onClick={() => handleAccept(applicant._id)}
                            className="accept-btn"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(applicant._id)}
                            className="decline-btn"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-applicants">No applicants yet</p>
                  )}
                </div>
              </div>
            )}

            
          </div>



          <div className="bottom-right">
            <div className="category">Project Status:</div>
            <p>{post.project_status}</p>
            <div className="category">Meeting Style:</div>
            <p>{post.meetingStyle}</p>
            <div className="category">Capacity:</div>
            <p>{post.capacity}</p>
            <div className="category">Skills looking for:</div>
            <div className="skills">
              {post.tags.map((tag, index) => (
                <div key={index} className="skill">
                  {tag}
                </div>
              ))}
            </div>

            <div className="buttons">

              {currentUser === post.creatorId._id && (
                <button onClick={handleEdit}
                 className="edit-btn">Edit</button>
              )}


              <button onClick={() => {
                if (currentUser) {
                  handleApply()
                } else {
                  alert('Please login to apply to the project');
                }
              }} className="apply-btn">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

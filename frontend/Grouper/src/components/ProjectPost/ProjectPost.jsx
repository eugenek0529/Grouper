import "./projectPost.css";
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';



export default function ProjectPost({ post, closePost }) {

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
            <h3>Descriptions:</h3>
            <p>{post.description}</p>
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
  );
}

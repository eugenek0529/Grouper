import "./projectPost.css";

export default function ProjectPost({ post, closePost }) {
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
            <button className="apply-btn">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

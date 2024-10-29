import './projectPost.css'

export default function ProjectPost({closePost}) {
  return (
    <div className='projectPost'>
        
      <div className="projectPost-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePost}>x</button>
        <div className="top">
            <h2 className='title'>Project Details</h2>
            <span className='creator'>CreaterID</span>
            <span className='location'>locatoion</span>
        </div>

        <div className="divider"></div>

        <div className="bottom">
            <div className="bottom-left">
                <h3>Descriptions:</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum amet Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo animi, porro ea cupiditate vitae nesciunt dolore natus expedita, illum ex rerum, enim vel sit nostrum ullam tempore quod reprehenderit atque!</p>
            </div>


            <div className="bottom-right">
                <div className="category">Project Status:</div>
                    <p>On-going</p>
                <div className="category">Meeting Style:</div>
                    <p>hybrid</p>
                <div className="category">Capacity:</div>
                    <p>2/4</p>
                <div className="category">Skills looking for:</div>
                <div className="skills">
                  <div className="skill">skill1</div>
                  <div className="skill">skill2</div>
                  <div className="skill">skill3</div>
                </div>
                <button className='apply-btn'>Apply</button>
            </div>

        </div>

        
      </div>
    </div>
  )
}

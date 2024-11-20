import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './groups.css';
import { AuthContext } from '../../contexts/authContext';

export default function Groups() {
    const [joinedPosts, setJoinedPosts] = useState([]);
    const [appliedPosts, setAppliedPosts] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const { user } = useContext(AuthContext);
    let userId = user ? user._id : null;

    useEffect(() => {
        const userGroups = async () => {
            try {
                if (!userId) {
                    console.log('No userId available');
                    return;
                }
                
                const response = await axios.get(`http://localhost:8000/api/posts/${userId}/groups`);
                
                const joinedData = Array.isArray(response.data.joined) ? response.data.joined : [];
                const appliedData = Array.isArray(response.data.applied) ? response.data.applied : [];
                
                setJoinedPosts(joinedData);
                setAppliedPosts(appliedData);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        userGroups();
    }, [userId]);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const handleCloseModal = () => {
        setSelectedGroup(null);
    };

    console.log(joinedPosts) // display array for test

    const getMemberDisplayName = (member) => {
        if (!member) return 'Unknown Member';
        return member.fullname || member.username || 'Unknown Member';
    };

    return (
        <div className='groups'>
            <div className="list-top">
                <h3 className="top-list">Joined Groups</h3>
                <div className="scroll-container">
                    <div className="top-groups">
                        {joinedPosts.map((post) => (
                            <div 
                                key={post._id} 
                                className="group-card"
                                onClick={() => handleGroupClick(post)}
                            >
                                <h4 className="group-title">{post.title}</h4>
                                <p className="group-description">{post.description}</p>
                                <div className="group-details">
                                    <span className="location">📍 {post.location}</span>
                                    <span className="members">👥 {post.members.length} members</span>
                                    <span className="status">Status: {post.project_status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="list-bottom">
                <h3 className="bottom-list">Applied Groups</h3>
                <div className="scroll-container">
                    <div className="bottom-groups">
                        {appliedPosts.map((post) => (
                            <div 
                                key={post._id} 
                                className="group-card"
                                onClick={() => handleGroupClick(post)}
                            >
                                <h4 className="group-title">{post.title}</h4>
                                <p className="group-description">{post.description}</p>
                                <div className="group-details">
                                    <span className="location">📍 {post.location}</span>
                                    <span className="status">Status: {post.project_status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedGroup && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}>×</button>
                        <h3 className="modal-title">{selectedGroup.title} - Members</h3>
                        <div className="modal-members">
                            {selectedGroup.members && selectedGroup.members.length > 0 ? (
                                <ul className="members-list">
                                    {selectedGroup.members.map((member, index) => (
                                        <li key={member._id} className="member-item">
                                            {getMemberDisplayName(member)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No members found</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try{
    const { title, creatorId, description, location, meetingStyle, tags, capacity, project_status, applicants, members } = req.body;
    console.log(creatorId);

    const newPost = new Post({
      title,
      creatorId,
      description,
      location,
      meetingStyle,
      tags,
      capacity,
      project_status,
      applicants,
      members
    });

    console.log(newPost);

    if (newPost){
      await newPost.save();

      res.status(200).json({
        title: newPost.title,
        creatorId: newPost.creatorId,
        description: newPost.description,
        location: newPost.location,
        meetingStyle: newPost.meetingStyle,
        tags: newPost.tags,
        capacity: newPost.capacity,
        project_status: newPost.project_status,
        applicants: newPost.applicants,
        members: newPost.members
      })
    }
    else{
      res.status(400).json({error: "Failes to create post due to invalid data"});
    }

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

export const getPosts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.title) {
      filter.title = { $regex: req.query.title, $options: "i" }; // 'i' for case-insensitive
    }
    if (req.query.location) filter.location = req.query.location;
    if (req.query.meetingStyle) filter.meetingStyle = req.query.meetingStyle;
    if (req.query.tags) filter.tags = { $in: req.query.tags.split(",") };
    if (req.query.capacity) filter.capacity = parseInt(req.query.capacity);
    if (req.query.project_status) filter.project_status = req.query.project_status;

    const posts = await Post.find(filter)
      .populate('creatorId', 'fullname')
      .populate('applicants', 'fullname')
      .populate('members', 'fullname');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export const applyToPost = async (req, res) => {

  try {
    

    const {postId} = req.params; 
    const {userId} = req.body; 
    

    if (!postId || !userId) {
      return res.status(400).json({error: 'Missing required params and input'})
    }

    // find the post
    const post = await Post.findById(postId); 
    if(!post) {
      console.log('No Post is found')
      return res.status(404).json({error: 'Post not found'})
    }

    // check if user is creator which then cannot apply
    if (post.creatorId.toString() === userId) {
      return res.status(400).json({ error: 'Cannot apply to your own post' });
    }

    // Check if user has already applied
    if (post.applicants && post.applicants.includes(userId)) {
      return res.status(400).json({ error: 'You have already applied to this project' });
    }


    // NOW EVERYTHING IS VALIDATED, So add user
    const updatedPost = await Post.findByIdAndUpdate(
      postId, 
      {$push: {applicants: userId} }, 
      {new: true},
    )

    if (!updatedPost) {
      return res.status(500).json({ error: 'Failed to update post' });
    }

    return res.status(200).json({
      message: 'Successfully applied to a project', 
      post: updatedPost
    })

  } catch (error) {
    console.error('Error in applyToPost:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}


export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { 
      title, 
      description, 
      location, 
      meetingStyle, 
      tags, 
      capacity, 
      project_status,
      applicants,
      members 
    } = req.body;

    // Validate post existence
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        location,
        meetingStyle,
        tags,
        capacity,
        project_status,
        applicants,
        members
      },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(500).json({ error: 'Failed to update post' });
    }

    // Return the updated post
    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost
    });

  } catch (error) {
    console.error('Error in updatePost:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}


export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Validate post existence
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Error in deletePost:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};


// hanlde accept applicants as a creator
export const acceptApplicant = async (req, res) => {
  const creatorId = req.body.userId; 
  try {
    const { postId, applicantId } = req.params;

    // Validate post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Ensure only the creator can accept applicants
    if (post.creatorId.toString() !== creatorId) { // Assuming req.user contains the logged-in user's ID
      return res.status(403).json({ error: 'Unauthorized to accept applicants for this post' });
    }

    // Check if applicant exists in the applicants array
    if (!post.applicants.includes(applicantId)) {
      return res.status(400).json({ error: 'User is not an applicant for this post' });
    }

    // Update the post: move applicant to members and remove from applicants
    post.applicants = post.applicants.filter((id) => id.toString() !== applicantId);
    if (!post.members.includes(applicantId)) {
      post.members.push(applicantId);
    }
    await post.save();

    res.status(200).json({
      message: 'Applicant accepted successfully',
      post,
    });
  } catch (error) {
    console.error('Error in acceptApplicant:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

// handel decline applicant
export const declineApplicant = async (req, res) => {
  const creatorId = req.body.userId; 
  try {
    const { postId, applicantId } = req.params;

    // Validate post existence
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Ensure only the creator can decline applicants
    if (post.creatorId.toString() !== creatorId) { // Assuming req.user contains the logged-in user's ID
      return res.status(403).json({ error: 'Unauthorized to decline applicants for this post' });
    }

    // Check if applicant exists in the applicants array
    if (!post.applicants.includes(applicantId)) {
      return res.status(400).json({ error: 'User is not an applicant for this post' });
    }

    // Update the post: remove the applicant from applicants
    post.applicants = post.applicants.filter((id) => id.toString() !== applicantId);
    await post.save();

    res.status(200).json({
      message: 'Applicant declined successfully',
      post,
    });
  } catch (error) {
    console.error('Error in declineApplicant:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};
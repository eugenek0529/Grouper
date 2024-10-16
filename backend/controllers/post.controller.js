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
        location: newPost``.location,
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
  try{
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err){
    res.status(500).json({error: err.message});
  }
}

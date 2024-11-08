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
    if (req.query.creatorId) filter.creatorId = req.query.creatorId;
    if (req.query.location) filter.location = req.query.location;
    if (req.query.meetingStyle) filter.meetingStyle = req.query.meetingStyle;
    if (req.query.tags) filter.tags = { $in: req.query.tags.split(",") };
    if (req.query.capacity) filter.capacity = parseInt(req.query.capacity);
    if (req.query.project_status) filter.project_status = req.query.project_status;

    const posts = await Post.find(filter);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

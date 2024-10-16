import Tag from "../models/tags.model.js";

export const createTag = async (req, res) => {
  try{
    const {skill} = req.body;
    console.log({skill});

    const currentSkill = await Tag.findOne({skill});
    if (currentSkill){
      return res.status(400).json({error:"Skill already exists"});
    }

    const newSkill = new Tag({skill});
    if (newSkill) {
      await newSkill.save();

      res.status(200).json({
        skill: newSkill.skill
      })
    }
    else{
      res.status(400).json({error: "Failed to add new skill"});
    }

  } catch(err){
    res.status(500).json({error: err.message});
  }
}


export const getTags = async (req, res) => {
    try {
    const tag = await Tag.find();
    res.status(200).json(tag);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

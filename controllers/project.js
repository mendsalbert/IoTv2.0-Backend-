const Project = require("../models/Project");

exports.getProjectController = async (req, res) => {
  try {
    const user_id = req.user.id;
    let project = await Project.findOne({ user_id });
    res.json({ project });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.getProjectsController = async (req, res) => {
  try {
    let user_id = req.user.id;
    let projects = await Project.find({ user_id: user_id });
    res.json({ projects });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.addProjectController = async (req, res) => {
  try {
    const { pname, topic, description } = req.body;
    //!THIS IS COMMENTED TEMPORARY (IN PRODUCTION TOPIC MUST BE UNIQUE TO AVOID CONFLICT)
    // let proj = await Project.findOne({ topic: topic });
    // if (proj) {
    //   return res.status(400).json({ msg: "Topic name exist" });
    // } else {
    const user_id = req.user.id;
    let project = new Project({
      name: pname,
      user_id: user_id,
      topic: topic,
      description: description,
    });
    const savedProject = await project.save();
    res.json({ savedProject });
    // }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.editProjectController = async (req, res) => {
  try {
    const { pname, topic, description } = req.body;
    let proj = await Project.find({ topic: topic });
    if (proj) {
      res.json({ msg: "Topic name exist" });
    } else {
      let project_id = req.params.id;
      let project = await Project.findByIdAndUpdate(
        { _id: project_id },
        { name: pname, topic: topic, description: description }
      );
      res.json({ project });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.deleteProjectController = async (req, res) => {
  try {
    let project_id = req.params.id;
    let project = await Project.findByIdAndDelete({ _id: project_id });
    res.json({ project });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

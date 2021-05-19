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
    let projects = await Project.find({});
    res.json({ projects });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.addProjectController = async (req, res) => {
  try {
    const { pname, topic } = req.body;

    //todo Make topic unique. Check if it already exist
    const user_id = req.user.id;
    let project = new Project({
      name: pname,
      user_id: user_id,
      topic: topic,
    });
    const savedProject = await project.save();
    res.json({ savedProject });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.editProjectController = async (req, res) => {
  try {
    const { pname, topic } = req.body;
    let project_id = req.params.id;
    let project = await Project.findByIdAndUpdate(
      { _id: project_id },
      { name: pname, topic: topic }
    );
    res.json({ project });
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

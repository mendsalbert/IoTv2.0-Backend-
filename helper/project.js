/**
 * Import Project DB
 * create a function accepting user id
 * return the whole object of project with that particular user id
 */
const Project = require("../models/Project");

const getProjectID = async (userId) => {
  let project = await Project.findOne({ user_id: userId });
  return project;
};
module.exports = getProjectID;

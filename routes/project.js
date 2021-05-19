const express = require("express");
const route = express.Router();
const {
  getProjectController,
  getProjectsController,
  addProjectController,
  editProjectController,
  deleteProjectController,
} = require("../controllers/project");

const { authenticated } = require("../middlewares/authenticate");

//?route -- POST /api/iot/v2.0/project/get-project
//?@desc -- get a project
//?@access -- protected
route.get("/get-project", authenticated, getProjectController);

//?route -- POST /api/iot/v2.0/project/get-projects
//?@desc -- get all projects
//?@access -- protected
route.get("/get-projects", authenticated, getProjectsController);

//?route -- POST /api/iot/v2.0/project/add-project
//?@desc -- add a project
//?@access -- protected
route.post("/add-project", authenticated, addProjectController);

//?route -- POST /api/iot/v2.0/project/edit-project
//?@desc -- edit a project
//?@access -- protected
route.post("/edit-project/:id", authenticated, editProjectController);

//?route -- POST /api/iot/v2.0/project/delete-project
//?@desc -- delete a project
//?@access -- protected
route.delete("/delete-project/:id", authenticated, deleteProjectController);

module.exports = route;

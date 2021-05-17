const express = require("express");
const route = express.Router();
const {
  getProjectController,
  getProjectsController,
  addProjectController,
  editProjectController,
  deleteProjectController,
} = require("../controllers/project");

//todo ADD AUTHENTICATION ALL ROUTES
// const { authenticated } = require("../middlewares/auth");

//?route -- POST /api/iot/v2.0/project/get-project
//?@desc -- get a project
//?@access -- protected
route.get("/get-project/:user_id", getProjectController);

//?route -- POST /api/iot/v2.0/project/get-projects
//?@desc -- get all projects
//?@access -- protected
route.get("/get-projects", getProjectsController);

//?route -- POST /api/iot/v2.0/project/add-project
//?@desc -- add a project
//?@access -- protected
route.post("/add-project", addProjectController);

//?route -- POST /api/iot/v2.0/project/edit-project
//?@desc -- edit a project
//?@access -- protected
route.post("/edit-project/:id", editProjectController);

//?route -- POST /api/iot/v2.0/project/delete-project
//?@desc -- delete a project
//?@access -- protected
route.delete("/delete-project/:id", deleteProjectController);

module.exports = route;

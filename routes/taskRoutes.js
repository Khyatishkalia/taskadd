const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");

router.get("/",TaskController.showTasks);
router.get("/posts/:_id",TaskController.showSingleTask);
router.put("/editposts/:_id",TaskController.updateTask);
router.post("/compose",TaskController.createTask);

module.exports = router;
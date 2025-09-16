import express from "express"
import quickActionTasksController from "../controllers/quickActionsController.js"
import projectsController from "../controllers/projectsMainHubController.js"
import { quickAccessInstances, secondaryAccessInstances } from "../controllers/assets.js"
import quickActionsRouter from "./quickActions.js"
import projectsRouter from "./projects.js"
import sessionRouter from "./session.js"
import brainstormingRouter from "./brainstorming.js"


const router = express.Router()

// router.use("/projects", projectsRouter);
router.use("/quickActions", quickActionsRouter);
router.use("/projects", projectsRouter);
router.use("/session", sessionRouter);
router.use("/brainstorming", brainstormingRouter)


router.get("/",async (req,res) => {

  const quickActionTasks = await quickActionTasksController.getQuickActionTasks()
  const projectInstances = await projectsController.getProjectInstances()
  
    res.render("main", {quickAccessInstances,secondaryAccessInstances,quickActionTasks,projectInstances})
})

export default router
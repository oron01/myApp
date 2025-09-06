import {Router} from "express"
import controller  from "../controllers/projectsController.js";

const router = Router()
console.log("skibidi")
router.patch("/:id",controller.updateProjects)

export default router
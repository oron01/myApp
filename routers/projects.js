import {Router} from "express"
import projectMainHubController  from "../controllers/projectsMainHubController.js";
import projectHubController from "../controllers/projectsHubController.js"

const router = Router()
router.patch("/projectsMainHub/:id",projectMainHubController.updateProjects)

router.get("/projectHub/:id", async (req,res) => {
    let {id} = req.params
    const projectData =  await projectHubController.getProjectData(id)
    res.render("projectHub", {projectData})
})

export default router
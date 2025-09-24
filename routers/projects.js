import {Router} from "express"
import projectMainHubController  from "../controllers/projectsMainHubController.js";
import projectHubController from "../controllers/projectsHubController.js"

const router = Router()
router.patch("/projectsMainHub/:id",projectMainHubController.updateProjects)

router.patch("/projectHub/mainDump/:id",projectMainHubController.updateProjects)

router.patch("/projectHub/noteInstances/:id",projectMainHubController.updateProjects)

router.post("/projectHub/noteInstances/createNote/:projectID",projectHubController.createNewNote)


router.get("/projectHub/:id", async (req,res) => {
    let {id} = req.params
    const projectData =  await projectHubController.getProjectData(id)
    const mainDumpData = await projectHubController.getMainDump(id)
    const notesData = await projectHubController.getNotesData(id)
    const goalsData = await projectHubController.getGoalsData(id)
    res.render("projectHub", {projectData,mainDumpData,notesData,goalsData})
})

export default router
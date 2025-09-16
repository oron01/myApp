import {Router} from "express"
import brainstorming from "../controllers/brainstormingController.js"

const router = Router()

router.patch("/updateDatapoint/:datapointID",brainstorming.handleUpdateBrainstormingRequest)
router.patch("/updateInstanceName/:instanceID",brainstorming.handleUpdateBrainstormingTitleRequest)
router.patch("/createBrainstormingInstance",brainstorming.createBrainstormingInstance)

router.get("/", async (req,res) => {
    let brainstormingInstances = await brainstorming.sendBrainstormingData()
    res.render("brainstorming", {brainstormingInstances})
})

export default router
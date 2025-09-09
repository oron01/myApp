import {Router} from "express"
import {getLatestSessionToken, incrementSessionTokens} from "../controllers/sessionController.js"

const router = Router()
router.get("/", async (req,res) => {
    let a = await getLatestSessionToken()
res.send(a)
})

router.post("/increment", async (req,res) => {
    await incrementSessionTokens()
    res.send("incremented")
})

export default router
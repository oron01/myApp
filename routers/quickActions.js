import {Router} from "express"
import controller  from "../controllers/quickActionsController.js";

const router = Router()

router.patch("/:id",controller.updateQuickActionTask)

export default router
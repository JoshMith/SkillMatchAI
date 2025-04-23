import { addSkill, deleteSkill, getSkills, updateSkill } from '@app/controllers/skillController'
import { protect } from '@app/middlewares/auth/protect'
import { adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.get("/", protect, getSkills)
router.post("/", protect, addSkill)
router.put("/:id", protect, adminGuard, updateSkill)
router.delete("/:id", protect, adminGuard, deleteSkill)

export default router
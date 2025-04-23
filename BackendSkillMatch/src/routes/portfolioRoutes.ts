import { addPortfolio, deletePortfolio, getPortfoliosByUserId, updatePortfolio } from '@app/controllers/portfolioController'
import { protect } from '@app/middlewares/auth/protect'
import { adminGuard } from '@app/middlewares/auth/roleMiddleWare'
import express from 'express'

const router = express.Router()

router.post("/", protect, addPortfolio)
router.get("/:user_id", protect, getPortfoliosByUserId)
router.put("/:id", protect, updatePortfolio)
router.delete("/:id", protect, deletePortfolio)

export default router
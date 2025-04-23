import express from 'express'
import { deleteUser, getUserByEmail, getUserById, getUserByName, getUsers, updateUser } from '../controllers/userController'
import { protect } from '../middlewares/auth/protect'
import { adminGuard } from '@app/middlewares/auth/roleMiddleWare'

const router = express.Router()

router.get("/", protect, adminGuard,  getUsers)
router.get("/:id",protect,  getUserById)
router.get("/name/:name",protect,adminGuard, getUserByName)
router.get("/email/:email",protect,adminGuard, getUserByEmail)
router.put("/:id",protect,adminGuard, updateUser)
router.delete("/:id",protect,adminGuard, deleteUser)

export default router
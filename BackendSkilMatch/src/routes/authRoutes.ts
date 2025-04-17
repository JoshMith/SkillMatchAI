import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/authController'

const router = express.Router()

//public routes 
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)



export default router
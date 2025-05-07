import express from 'express'
import { loginUser, logoutUser, registerEmployer, registerJobseeker, registerUser } from '../controllers/authController'

const router = express.Router()

//public routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/register-jobseeker", registerJobseeker)
router.post("/register-employer", registerEmployer)

export default router

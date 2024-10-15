import express from 'express'

import { register,login, forgetPassword, resetPassword, UserProfile, logoutUser,getUserProfileById } from '../Controller/userController.js'
const router= express.Router()

router.post('/login',login)
router.post('/register',register)
router.post('/forget-password',forgetPassword)
router.get('/profile',UserProfile)
router.put('/reset-password/:token', resetPassword);
router.post('/logout',logoutUser);
router.get('/users/:id', getUserProfileById)


export default router;
import { Router } from "express";
import * as userController from './user.controller.js'
const router = Router()

router.post('/', userController.addUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.get('/search', userController.searchUser)
router.get('/searchById', userController.searchUserByIds)
router.get('/', userController.listUsers)
router.get('/usersWithP', userController.usersWithP)







export default router
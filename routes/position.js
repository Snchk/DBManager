const express = require('express')
const passport =require('passport')
const controller = require('../controllers/position')
const router = express.Router()


//localhost:5000/api/auth/login
router.get('/',passport.authenticate('jwt',{session:false}),controller.getAll)
router.get('/:id',controller.getById)
router.post('/',controller.create)
router.delete('/:id',controller.remove)
router.patch('/:id',controller.update)
module.exports=router
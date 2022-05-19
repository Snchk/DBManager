const express = require('express')
const passport =require('passport')
const controller = require('../controllers/client')
const router = express.Router()


//localhost:5000/api/client/
router.get('/',passport.authenticate('jwt',{session:false}),controller.getAll)
router.get('/read-client/:id',passport.authenticate('jwt',{session:false}),controller.getById)
router.post('/add-client',passport.authenticate('jwt',{session:false}),controller.create)
router.delete('/delete-client/:id',passport.authenticate('jwt',{session:false}),controller.remove)
router.put('/update-client/:id',passport.authenticate('jwt',{session:false}),controller.update)
module.exports=router
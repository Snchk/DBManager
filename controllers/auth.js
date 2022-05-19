const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const keys=require('../config/keys')
const errorHandler=require('../utils/errorHandler')
module.exports.login = async function (req,res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //сверяем пароли
const passwordResult= bcrypt.compareSync(req.body.password,candidate.password)
        if(passwordResult){
            //генерация токена
            const token = jwt.sign({
                email:candidate.email,
                userId:candidate._id
            },keys.jwt,{expiresIn: 60*60})
                res.status(200).json({
                    token: `Bearer ${token}`
                })
        }
        else {
            res.status(401).json({
                massage: 'Пароли не совпадают'
            })
        }
    } else {
        res.status(404).json({
            massage: 'Пользователь не найден'
        })
    }
}
module.exports.register = async function (req,res) {
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        res.status(409).json({
            massage: 'Пользователь уже существует'
        })
    } else {
        const salt= bcrypt.genSaltSync(10)
        const password=req.body.password
        const user= new User({
            email: req.body.email,
            password:bcrypt.hashSync(password,salt)
        })
    try {
    await user.save()
        res.status(201).json(user)
    }
    catch (e){
errorHandler(res,e)
    }
}}
//user.save().then(()=> console.log('User created'))


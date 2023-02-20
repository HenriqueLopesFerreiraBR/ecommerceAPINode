const express = require('express')
const routes = express.Router()
const User = require('../models/User')
const {verifyToken} = require('./verifyToken')

//GET USERS
routes.get('/', async (req,res)=>{
    try {
        const users =  await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
    }
})
//UPDATE USERS
routes.put('/:id',verifyToken, async (req,res)=>{
    try {
        if(req.user.id === req.params.id || req.user.isAdmin){
            
        }

        res.status(203).json({message:"registro atualizado"})
    } catch (error) {
        res.status(401).json(error)
    }
})
// DELETE USERS
routes.delete('/:id', async (req,res)=>{
    try {
        res.status(205).json('registro deletado')
    } catch (error) {
        res.status(403).json(error)
    }
})

module.exports = routes
const express = require('express')
const routes = express.Router()

routes.get('/',(req,res)=>{
    console.log('rota testada ')
})

module.exports = routes
const jwt = require('jsonwebtoken')


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if (authHeader) {
        jwt.verify(token,process.env.JWT_SEC, (err,user)=>{
            if (err) {
                return res.status(401).json("O token não é valido") 

            }else{
                req.user = user;
                next();
            }
        })
    } else {
        return res.status(401).json("Você não tem autorização!")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
    })
}
module.exports = {
    verifyToken
}
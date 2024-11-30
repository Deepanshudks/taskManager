const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const AuthCheck = (req,res,next)=>{
    const token = localStorage.getItem("token")
    if(!token ){
        return res.status(403).json({
            message : "Login required"
        })
    }
    try {
        const decoded = jwt.verify(token,JWT_SECRET)
        if(decoded){
            req.username = decoded
            next()
            return
        }else{
            return res.status(403).json({message : "auth failed"})
        }
    } catch (error) {
        return res.status(403).json({message : error.message})
    }
}



module.exports = {AuthCheck}
const JWT=require('jsonwebtoken')
const User=require('../modals/userModal')
const secret='ahmed ka secret'
const ErrorHander = require("../utils/ErrorHandler");



exports.authenticateUser=async(req,res,next)=>{
    try{
    const {token}=req.cookies
    
    if(!token){
        return next(new ErrorHander("Invalid email or password", 401));
    }
    const decodedData=await JWT.verify(token,secret)
    req.user=await User.findById(decodedData.id)
    next()
    }
    catch(e){
        console.log(e)
        res.json('not available')
    }
}

exports.authorizeUser=(...roles)=>{
    return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorHander("Invalid role for using this resource", 401));
    }
    next()
}
    

}
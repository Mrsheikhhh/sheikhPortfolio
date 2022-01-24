const User=require('../modals/userModal')
const ErrorHandler = require("../utils/ErrorHandler");
const Token=require('../utils/Token')
const Weather=require('../utils/Weather')
exports.createUser=(async(req,res)=>{
    try{
        
        /*const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "samples",
            width: 150,
            crop: "scale",
        });*/
        
        const {name,email,password}=req.body
        const user=await User.create({
        name,email,password,
      /*avatar: {
          publicId: myCloud.public_id,
            url: myCloud.secure_url,
          },*/
          
    })
    res.json(user)
    
 
}
catch(e){
    console.log(e)
    }
    
    
})

exports.loginUser=(async(req,res,next)=>{
    try{
    
    const {email,password}=req.body
    const user=await User.findOne({email:email}).select('+password')
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }
    if(!email || !password){
        return next(new ErrorHandler("please enter all requirements ", 401));
    }
  
    const pass=await user.comparePassword(password)
    if(!pass){
        return next(new ErrorHandler("Please login with correct credentials", 401));
    }

 
    await Token(user,200,res)
    }
    catch(e){
        console.log(e)
    }

})
exports.logoutUser=(async(req,res)=>{
    try{
        res.cookie('token',null,{
            expiresIn:new Date(Date.now())
        })
        res.json(
            'succesfully logout'
        )
    }
    catch(e){
        console.log(e)
    }
})
exports.showWeather=(async(req,res)=>{
    try{
        const {city}=req.body
    
    await Weather(city,res)
    

    }
    catch(e){
        console.log(e)
    }
})
exports.getAllUsers=(async(req,res)=>{
    try{
    const allUsers=await User.find()
   
    res.json(allUsers)}
    catch(e){
        console.log(e)
    }

})
exports.getUser=(async(req,res)=>{
    try{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorHander("this user is invalid", 401));
    }
    res.json(user)}
    catch(e){
        console.log(e.message)
        res.json('you are sending totally wrong id')
    }

})
exports.deleteUser=(async(req,res,next)=>{
    try{
        
   
    let user=await User.findById(req.params.id)
    
   
    if(!user){

         res.json('this is not available')
  
    }
    
  await User.findByIdAndDelete(user)
   res.json('delete successfully')

}
    catch(e){
  console.log(e.message)
  res.json('you are sending totally wrong id')
        }
        
    }

)
exports.updateProfile=(async(req,res,next)=>{
    try{
        const newData={
            name:req.body.name,
            email:req.body.email
        }
    let  user=await User.findById(req.user.id)
    if(!user){
        res.json('product not found')
  
    }  
   user=await User.findByIdAndUpdate(req.user.id,newData,{
       new:true,
       runValidators:true,
       useFindandModify:false
  
   })
   
   
   res.json(user)}
catch(e){
    res.json('not found')
    console.log(e.message)
}

})

exports.updatePassword=async(req,res,next)=>{
    try{
    const user=await User.findById(req.user.id).select('+password')
    if(!user){
        res.json('invalid user')
    }
    const password=await user.comparePassword(req.body.oldPassword)
    if(!password){
        res.json('wrong password')
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        res.json('match password')
    }
   user.password=req.body.newPassword
   await user.save()
   res.json('password updated')
   
}
catch(e){
    console.log(e)
}


}


exports.myDetails=async(req,res,next)=>{
    const user=await User.findById(req.user.id)
    res.json(user)


}

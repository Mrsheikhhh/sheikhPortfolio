const mongoose=require('mongoose')
const secret='ahmed ka secret'
const JWT=require('jsonwebtoken')
const EXPIRES_IN="5d"

const bcrypt=require('bcrypt')

const userSchema= new mongoose.Schema({
 
    name:{
        required:[true,'user name is required'],
        type:String,
        minlength:[6,'name must be more than 6 characters']
    },
    email:{
        unique:[true,'no same email'],
        required:[true,'email to chahiue bhai'],
        type:String,
        isEmail:[true,'Enter a vali email'],
       
   
    },
  password:{
        required:[true,'password is required'],
        select:false,
        type:String,
        minlength:[8,'name must be more than 8 characters']
    },
    expireToken:String,
    resetPasswordToken:String,
    passwordExpireDate:String,
    role:{
        type:String,
        default:'user',
    }


})
userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
      this.password=await bcrypt.hash(this.password,10)

})

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.sendToken=async function(){
    return await JWT.sign({id:this._id},secret,{
        expiresIn:EXPIRES_IN
    })
}
userSchema.methods.resetToken=async function(){
    try{
    const string= await crypto.randomBytes(20).toString('hex')
    
    this.resetPasswordToken= await crypto.createHash('sha256').update(string).digest('hex')
    this.passwordExpireDate=Date.now()+15*60*1000
    
    return string;}
    catch(e){
        console.log(e.message)
    }
    
}

    
module.exports=mongoose.model('WEATHER USER',userSchema)
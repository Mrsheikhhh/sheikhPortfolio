const moongoose=require('mongoose')
exports.connectDb=()=>{moongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false").then((()=>{
    console.log('connected')
})).catch((e)=>{
    console.log(e,"not connected")
})}
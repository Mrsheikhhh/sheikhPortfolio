const express=require('express')
const bodyParser=require('body-parser')



const app=new express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))



 module.exports=app

const { connectDb } = require("./db/db")
const user=require("./Routes/userRoute")
const app=require("./app")
const cookieParser=require('cookie-parser')
app.use(cookieParser())

connectDb()
app.use('/api/v1',user)
app.listen(5000,()=>{
    console.log('server is ready')
})
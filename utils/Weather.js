
const axios=require('axios')


const weather = async(city,res) => {
    try{
 const api= await axios.post(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=80975f96744ba74af078e889f56f7c36`)
   res.send(api.data.weather)

    }
    catch(e){
        console.log(e)
    }
    
  
  };
  
  module.exports = weather
  
   
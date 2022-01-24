// Create Token and saving in cookie

const getToken = async(user, statusCode, res) => {
  
    const token = await user.sendToken();
  
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + "5d" * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    await res.status(statusCode).cookie("token", token, options).json({
      success:true,
      token,
      user
     
    });
  
  
    
  
  };
  
  module.exports = getToken
  
   
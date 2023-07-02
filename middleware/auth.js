// Loading jwt :
const jtw=require('jsonwebtoken');

let checkAuth=((req,res,next)=>{
       try{
              jtw.verify(req.headers.token,'myscretKey')
       }
       catch(error){
         return res.status(200).json({'message':'Token Invalid or removed !! Please Login to Continue....'})

       }
       next() // Redirect next available resourse :

});

module.exports=checkAuth;
console.log('Middleware is ready to use.....!');
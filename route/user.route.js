//Loading express :
const express=require('express');
//Loading bcryptjs :
const bcryptjs=require('bcryptjs');
// Loading jsonweToken :
const jwt=require('jsonwebtoken');
//Create router service of express :
const userRouter=express.Router();

//Consume userSchema :
const userModel = require('../model/user.model');


// Create a  async function for user signup :
async function createUser(req){
       let salt=bcryptjs.genSaltSync(10);
       let hasPass=bcryptjs.hashSync(req.body.pass1,salt);
       let newUser=new userModel({
         'name':req.body.name,
         'phone':req.body.phone,
         'email':req.body.email,
         'pass1':hasPass     
       });
       let response=await newUser.save();
       return response;
}

// Now create a user Signup :
userRouter.post('/user/signup',(req,res)=>{
       let userInfo=createUser(req);
       userInfo.then((userData)=>{
              // res.status(200).json(userData);
               res.status(200).json({'mesaage':'Sign Up successfully..!'});
               })
               .catch((error)=>{
              //   res.status(200).json(error);
              if(error.keyPattern.phone){
                     res.status(200).json({'message':'Phone is already register with us'})
              }
              if(error.keyPattern.email){
                      res.status(200).json({'message':'Email is already register with us'}) 
              }
              })
});


//Create a  async login function :
async function loginValiDate(req){
       let userInfo=await userModel
                          .findOne({'email':req.body.email})
                          .exec();
       return userInfo;                    
}


// Create a login :
userRouter.post('/user/signin',(req,res)=>{
       let loginRes=loginValiDate(req);
       loginRes.then((userData)=>{
              //    res.status(200).json(userData);
              let dbPass=userData.pass1;
              let result=bcryptjs.compareSync(req.body.pass1,dbPass);
              
              if(result){
                  let token=jwt.sign({'_id':userData._id},'myscretKey',{ expiresIn: '1h' });   
                  res.status(200).json({
                     'message':'Sign in Successfull...',
                     'activeUser':userData.name,
                     'token':token
                  })
              }else{
                 res.status(200).json({'message':'Wrong Credentials...!'});    
              }

                })
               .catch((error)=>{
                     // res.status(200).json(error);
                     res.status(200).json({'message':'Not yet register with us ..'});
               })
});



//Make available userRouter entire application :
module.exports=userRouter;
console.log('User router service is ready to use');

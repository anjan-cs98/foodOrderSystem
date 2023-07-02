// Loading mongoose library:
const mongoose=require('mongoose');

// Now create a user schema :
const userSchema=mongoose.Schema({
       'name':{type:String,required:true},
       'phone':{type:Number,required:true,unique:true},
       'email':{type:String,required:true,unique:true},
       'pass1':{type:String,required:true}
},{versionKey:false});

module.exports=mongoose.model('userModel',userSchema,'users');
console.log('User model is ready to use');
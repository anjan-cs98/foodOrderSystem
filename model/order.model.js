//Loading mongoose :
const mongoose=require('mongoose');


// Let's create a schema :
const orderSchema=mongoose.Schema({
       'order_date':{type:String,required:true},
       'user_id':{type:String,required:true,ref:'userModel'},
       'food_id':{type:String,required:true,ref:'foodModel'}
},{versionKey:false});

module.exports=mongoose.model('orderModel',orderSchema,'orderInfo');
console.log('Order Model is ready to use');
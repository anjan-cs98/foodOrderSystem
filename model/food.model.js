// loadng mongoose :
const mongoose=require('mongoose');

// Now create a foods Schema :
const foodSchema=mongoose.Schema({
       'food_name':{type:String,required:true},
       'food_desc':{type:String,required:true},
       'food_price':{type:Number,required:true},
       'food_image':{type:String,required:true}
},{versionKey:false});

module.exports=mongoose.model('foodModel',foodSchema,'foods');
// abc -> Just a virtual name for mongoose model :
//foodSchema -> Schema Object of the Model :
// foods -> Name of the data base collection :

console.log('Food Model is ready to use ');


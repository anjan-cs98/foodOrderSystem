// load mongoose library :
const mongoose=require('mongoose');

// Define db_url:
// const db_url='mongodb://127.0.0.1:27017/foodList';
const db_url="";

// Now connecting mongodb data base :
const con=mongoose.connect(db_url)
                  .then(()=>{
                     console.log('Mongodb Data base successfully connected');
                  })
                  .catch((error)=>{
                     console.log('Something went wrong'+error);
                  });

module.exports=con;
console.log('Global data base connection is ready to use');                  

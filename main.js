// loading express :
const express=require('express');
// loading cors :
const cors=require('cors');
// define port :
const port=3000;
// consuming data base connection :
const con=require('./db/db_connection');
// Consuming food Router service :
const foodRouter=require('./route/food.route');
//Consuming user Router service :
const userRouter=require('./route/user.route');
// Consume Order Router :
const orderRouter = require('./route/order.route');
// create a instance of express :
const app=express();
//no disabled cors :
app.use(cors());

//make application to accept incomimg post data ;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//Let express to share its static resources :
app.use(express.static('public'));

//now use food router service :
app.use('/api',foodRouter);
// Now use user router service:
app.use('/api',userRouter);
// Now use order router service :
app.use('/order',orderRouter);

//Now create a basic landing page :
app.get('/',(req,res)=>{
       res.send('<h1> Welocome to FoodRestro </h1>');
});

// Binding the port :
app.listen(port,()=>{
       console.log(`Server has started at ${port}`);
})
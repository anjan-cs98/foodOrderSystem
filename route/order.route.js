// Loading Express :
const express=require('express');
// Consume orderModel :
const orderModel=require('../model/order.model');
// Router ;
const orderRouter=express.Router();

// Now put a new order :
orderRouter.post('/buy/:user_id/:food_id',(req,res)=>{
       let newOrder=new orderModel({
              'order_date':new Date(),
              'user_id':req.params.user_id,
              'food_id':req.params.food_id
       });
       newOrder.save()
               .then((orderInfo)=>{
                     // res.status(200).json(orderInfo);
                     res.status(200).json({'message':'Order successfully placed...!'});
               })
               .catch((error)=>{
                  res.status(200).json({'message':`Something went wrong ${error}`});     
               })
});

// Now view order Details :
orderRouter.get('/view/:user_id',(req,res)=>{
//       let user_id=req.params.user_id;
      orderModel.find({'user_id':req.params.user_id})
                .populate({'path':'user_id'})
                .populate({'path':'food_id'})
                .exec()
                .then((orderData)=>{
                     if(!orderData.length){
                        res.status(200).json({'message':'No Such order History available'});      
                     }
                     else{
                     // res.status(200).json(orderData);
                     orderData.forEach((items)=>{
                            let orderInfo={
                                   'order_date':items.order_date,
                                   'user_name':items.user_id.name,
                                   'user_phone':items.user_id.phone,
                                   'user_email':items.user_id.email,
                                   'food_name':items.food_id.food_name,
                                   'food_desc':items.food_id.food_desc,
                                   'food_price':items.food_id.food_price,
                                   'food_image':items.food_id.food_image
                            }
                            res.status(200).json(orderInfo);
                     });


                     }
                })
                .catch((error)=>{
                  res.status(200).json({'message':error});    
                });
        
});


// Now export orderRouter :
module.exports=orderRouter;
console.log('Order router service is ready to use');
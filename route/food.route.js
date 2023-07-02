//loading express :
const express=require('express');

// consuming food model :
const foodModel=require('../model/food.model');
// Consuming file upload Obj:
const uploadObj=require('../file_upload/upload');
// Consume base_url :
const base_url=require('../urls/base_url');
// Consume auth check (Middleware):
const checkAuth=require('../middleware/auth');
// create a router service of Express :
const foodRouter=express.Router();

/*------------------All Food Related Api End Points ---------------------*/

// Geeting all data from data base :
foodRouter.get('/foods',(req,res)=>{
       // res.status(200).json('all foods');
       foodModel.find({}).exec()
                         .then((foodData)=>{
                            res.status(200).json(foodData);
                         })
                         .catch((error)=>{
                           res.status(200).json(error);
                         })
});

// Geeting perticular food item  depends on id:
foodRouter.get('/food/:id',(req,res)=>{
       foodModel.findOne({'_id':req.params.id}).exec()
                                               .then((foodInfo)=>{
                                                 if(!foodInfo){
                                                  res.status(200).json({'message':'No such food item found'})      
                                                 }
                                                 else
                                                 res.status(200).json(foodInfo);
                                                 })
                                               .catch((error)=>{
                                                 res.status(200).json({'message':'Something went wrong '+error});
                                               })
});

// Insert a new food item :
foodRouter.post('/food',uploadObj.single('food_image'),(req,res)=>{
        let newFoodModel=new foodModel({
            'food_name':req.body.food_name,
            'food_desc':req.body.food_desc,
            'food_price':req.body.food_price,
            'food_image':base_url+req.file.filename
        });
        newFoodModel.save()
                    .then((foodData)=>{
                       res.status(200).json({'message':'One food item added...'});
                    })
                    .catch((error)=>{
                       res.status(200).json({'message':`Something went wrong.... ${error}`})
                    })
});

// Delete Perticular food item :
foodRouter.delete('/food/:id',checkAuth,(req,res)=>{
       foodModel.findOneAndDelete({'_id':req.params.id}).exec()
                                                        .then((info)=>{
                                                               // res.status(200).json(info);
                                                               res.status(200).json({'message':'One item deleted successfully'})
                                                        })
                                                        .catch((error)=>{
                                                               res.status(200).json(error);
                                                        })
});


// updating particular food item :
foodRouter.all('/food/:id',uploadObj.single('food_image'),(req,res)=>{
     if(req.method=='PUT' || req.method=='PATCH'){
     // update code :
     foodModel.updateOne({'_id':req.params.id},{$set:{
       'food_name':req.body.food_name,
       'food_desc':req.body.food_desc,
       'food_price':req.body.food_price,
       'food_image':base_url+req.file.filename
     }}).exec()
       .then((foodInfo)=>{
              //  res.status(200).json(foodInfo);
              if(foodInfo.modifiedCount && foodInfo.matchedCount){
               res.status(200).json({'message':'One food item has been updated'})
              }
              else
              res.status(200).json({'message':'No such record exists..!'});  
       })
       .catch((error)=>{
              res.status(200).json({'message':error});
       })

     }
     else
     res.status(200).json({'message':`${req.method} method does't supports ...!`});
});

// Now make food router available entire application :
module.exports=foodRouter;
console.log('Food router service is ready to use');
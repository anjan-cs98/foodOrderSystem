// Loading multer :
const multer=require('multer');

// Basic cofi.for file upload :
const multerStorage=multer.diskStorage({
       destination:'public/uploads/',
       filename:(file,data,cb)=>{
              cb(null,Date.now()+'.jpg');
       }
});

const uploadObj=multer({storage:multerStorage});
module.exports=uploadObj;
console.log('File upload service is ready to use ');
'use strict';
function handleError(error,req,res,next){
  res.status(500).json({
    error:error,
    msg:`${error}`,
    path:req.path
  });
}
module.exports=handleError;

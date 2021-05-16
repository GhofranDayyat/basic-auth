'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/users-model');


async function baseAut(req,res,next){
    let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

   
          const user = await Users.findOne({ username: username })
          if(user){
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
            req.recored=user
            next()
            }
            else {
              next('Invalid User')
            }
          }else{
              next('User not found')
          }
      
        } 
    
module.exports=baseAut
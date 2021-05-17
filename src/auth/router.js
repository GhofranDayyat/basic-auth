'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const mongoose = require('mongoose');


const router = express.Router();
const Users = require('./models/users-model.js');
const baseAut = require('./middleware/oauth');


router.get('/',(req,res)=>{
    res.status(200).send('hello')
})


router.post('/signup', async (req, res) => {
      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new Users(req.body);
        const record = await user.save(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).json({
          error:e,
          msg: e.message
      }); }
    });




  router.post('/signin',baseAut, async (req, res) => { //signin

   
    try {
  
        res.status(201).json({
            user: req.recored
        })
    } catch (error) { res.status(403).send("Invalid Login"); }

  });

module.exports = router;
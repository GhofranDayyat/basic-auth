'use strict';
require('@code-fellows/supergoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');

const server = require('../src/server.js')
const express = require('express');
const superTest = require('supertest');
const mokeServer = superTest(server.app);

const user={
  username: 'ghofran',
  password:'123',
};

describe('Test routes',()=>{
    it('POST to /signup to create a new user',async()=>{
       let res =  await mokeServer.post('/signup').send(user);
       expect(res.body.username).toEqual(user.username);
       expect(res.status).toEqual(201)
    })
    it('POST to /signin to registering the user',async()=>{
        let userRaw='ghofran:123';
        const encode = base64.encode(userRaw)
        let res =  await mokeServer.post('/signin').set({
            Authorization: `Basic ${encode}`,
          });
          let checkPassword=await bcrypt.compare(user.password,res.body.user.password)
          expect(res.body.user.username).toEqual(user.username)
          expect(checkPassword).toEqual(true)
     })
})


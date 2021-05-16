'use strict';

require('@code-fellows/supergoose');
const bcrypt = require('bcrypt');

const User=require('../src/auth/models/users-model.js');
const user1={
    username: 'ghofran',
    password:'123',
};
describe('Test routes',()=>{
    it('POST to /signup to create a new user',async()=>{

   

    let newRecored=new User(user1)
    newRecored.password = await bcrypt.hash(user1.password,10)
    let record= await newRecored.save()
    const checkPassword = await bcrypt.compare(user1.password,record.password)
    expect(record.username).toEqual(user1.username)
    expect(checkPassword).toEqual(true)
    })

    it('POST to /signin to login as a user',async()=>{
        const teatUser = await User.findOne({username: user1.username})
        const checkpassword = await bcrypt.compare(user1.password,teatUser.password)
        expect(teatUser.username).toEqual(user1.username)
        expect(checkpassword).toEqual(true)

        console.log(teatUser.username,checkpassword);
    })

});

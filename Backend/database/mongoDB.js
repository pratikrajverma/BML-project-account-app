const mongoose = require('mongoose');

require('dotenv').config();

const DBconnect = async ()=>{
    try{
        await mongoose.connect(process.env.MongodbURL);
        console.log('database connected successfully');
    }catch(error){
        console.log('failed to connect with database :', error);
        process.exit(1);
    }
}

module.exports = DBconnect;
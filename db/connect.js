const moogoose = require('mongoose');

const connectDB = (url)=>{
    return moogoose.connect(url,{
        userNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
}

module.exports = connectDB;
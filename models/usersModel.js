const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, '補上名字']
    },
    email:{
        type:String,
        select:false,
        required:[true,'補上email']
    },
    photo:{
        type:String,
    }
},{
    versionKey:0
})
const User = mongoose.model('user',schema);

module.exports = User;

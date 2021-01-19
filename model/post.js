const {Schema, model} = require('mongoose')

const schema = new Schema({
    title:String,
    category:String,
    content:String,
    date:String,
    reading:String,
    imgLink:String
})


module.exports = model('post', schema)
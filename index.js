const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const PORT = process.env.PORT  || 4000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', require('./api/api.js'))



async function start(){
    try{
        await mongoose.connect('mongodb+srv://misha:misha966@cluster0.z9for.mongodb.net/postsdb>', {
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=> {
            console.log('Server has been started');
        })
    } catch (e){
        console.log(e);
    }
}
start()
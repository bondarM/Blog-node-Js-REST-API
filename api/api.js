const express = require('express')
const router = express.Router()
const Post = require('../model/post')
let cors = require('cors')
router.use(cors())

router.get('/blog', (req, res) =>{
    Post.find({})
    .then((post) =>{
        res.send(post)
    })
})

router.post('/blog', (req, res) =>{
    Post.create(req.body)
    .then((post) => {
        res.send(post)
    }).catch((err) => {
        
    });
})

router.get('/blog/:id', (req, res) =>{
   Post.findOne({_id:req.params.id})
   .then((post) =>{
    res.send(post)
})
})

router.get('/blog/category/:category', (req, res) =>{
    Post.find({category:req.params.category})
    .then((post) =>{
     res.send(post)
 })
 })

 


router.delete('/blog/:id', (req, res) =>{
    Post.deleteOne({_id:req.params.id}, req.params)
    .then((post) =>{
     res.send(post)
 })
 })

module.exports = router
const express = require('express');
const User = require('../models/user');

const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req,res) =>{
    User.find({}, (err,users) => {
        if (err) {
            res.json({suc:false, msg:"Something went wrong :("});
            return;
        }
        res.json({suc:true, users});
    })
})

router.post('/register', (req,res) => {
    if (!req.body.email || !req.body.password) {
        res.json({suc:false, msg:"Please enter email and password"})
        return;
    }

    User.find({email: req.body.email}, (err, docs) => {
        if (err) {
            res.json({suc:false, msg:"Something went wrong :("});
            return;
        }

        if (docs.length>0) {
            res.json({suc:false, msg:"Please choose another email"})
            return;
        }

        const user = new User({
            email: req.body.email,
            password: req.body.password
        });
    
        user.save((err,user) => {
            if (err) {
                res.json({suc:false, msg:err});
                return;
            }
    
            if (!user) {
                res.json({suc:false, msg:"Something went wrong :("});
                return;
            }
    
            res.json({suc:true, user:user});
        })
        
    }) 
 
})

router.post('/login', (req,res) => {
    if (!req.body.email || !req.body.password) {
        res.json({suc:false, msg:"Please enter email and password"})
        return;
    }

    User.find({email: req.body.email}, (err, doc) => {
        if (err) {
            res.json({suc:false, msg:"Something went wrong :("});
            return;
        }

        if (doc.length===0) {
            res.json({suc:false, msg:"Email doesnt exist!"})
            return;
        }

        if (doc.length > 1) {
            res.json({suc:false, msg:"Duplicate accounts, please contact us"})
            return;
        }

        if (doc[0].password != req.body.password) {
            res.json({suc:false, msg:"Incorrect password"})
            return;
        }

        res.json({suc:true});

        
        
    })

    
})



module.exports = router;

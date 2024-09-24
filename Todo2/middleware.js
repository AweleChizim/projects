const express = require("express");
const jwt = require("jsonwebtoken");
const User = require('./models/UserModel');
const app = express();


module.exports = async (req, res, next) => {
    if(req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        
        try {
            const decode = jwt.verify(token, 'secretkey');
            const user = await User.findById(decode.userId)
            if(!user){
                return res.json({success: false, message: 'unauthorized access!'});
            }

            req.user = user;
            next();
        } catch (error) {
            if(error.name === 'JsonWebTokenError'){
                return res.json({success: false, message: 'unauthorized access!'});
            }
            if(error.name === 'TokenExpiredError'){
                return res.json({success: false, message: 'Session expired try sign in again!'});
            }

            res.json({success: false, message: 'Internal server error'});
        }
    }else{
        res.json({success: false, message: 'unauthorized access!'})
    }
};
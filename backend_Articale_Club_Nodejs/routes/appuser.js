const express = require('express')
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../service/authentication');

router.post('/addNewAppuser', auth.authenticationToken, (req, res) => {
    let user = req.body;
    var query = "select email,password,status from appuser where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into appuser(name,email,password,status,isDeletetable) values(?,?,?,'false','true')";
                connection.query(query, [user.name, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Sucessfully Registered" });

                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email Already Exist" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email,password,status,isDeletetable from appuser where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Incoreect Email or Password" })
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Wait for admin approval" });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, isDeletetable: results[0].isDeletetable }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' });
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ message: "Something went wrong.Please try again later" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/getAllAppuser', auth.authenticationToken, (req, res) => {
    const tokenPayload = res.locals;
    var query;
    if (tokenPayload.isDeletetable === 'false') {
        query = "select id,name,email,status from appuser where isDeletetable='true'";

    }
    
    else {
        query = "select id,name,email,status from appuser where isDeletetable='true' and email!=? ";
    }
    connection.query(query, [tokenPayload.email], (err, results) => {
        if (!err) {
            return res.status(200).json(results);

        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.post('/updateUserStatus', auth.authenticationToken, (req, res) => {
    let user = req.body;
    var query = "update appuser set status=? where id=? and isDeletetable='true'";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "user ID does not exist" });
            }
            return res.status(200).json({ message: "user Updated SucessFuly" });


        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.post('/updateUser', auth.authenticationToken, (req, res) => {
    let user = req.body;
    var query = "update appuser set name=? ,email=? where id=? ";
    connection.query(query, [user.name, user.email, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "user ID does not exist" });
            }
            return res.status(200).json({ message: "user Updated SucessFuly" });


        }
        else {
            return res.status(500).json(err);
        }
    })
    
})


router.get('/checkToken',auth.authenticationToken,(req,res)=>{
    return res.status(200).json({message:"true"})
})
module.exports = router;
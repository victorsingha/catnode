const express = require('express')
const router = express.Router();
const jwtService = require('../Services/jwt')
const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../Services/dbConfig')
const st = require('../Models/mdlStatus');

router.post('/login', async (req, res) => {
    try {
        let obj = {
                email:'victor@gmail.com',
        }
        const token = jwtService.generateAccessToken(obj)
        res.send({ StatusCode:"S",StatusMessgae:"Success", Token: token })
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})

//test

router.get('/authenticate', jwtService.authenticateToken, (req, res) => {
    try {
        res.send(req.body)
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})




module.exports = router;
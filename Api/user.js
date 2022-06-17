const express = require('express')
const router = express.Router();
const jwtService = require('../Services/jwt')
const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../Services/dbConfig')
const st = require('../Models/mdlStatus');

router.post('/login', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("email", sql.VarChar, "victor@gmail.com")
            .input("password", sql.NVarChar, "12345")
            .execute("usp_loginUser").then(result => {
                if(result.recordset[0].StatusCode == "S")
                {
                    let obj = {
                        email:'victor@gmail.com',
                    }
                    const token = jwtService.generateAccessToken(obj)
                    res.send({ StatusCode:"S",StatusMessgae:"Success", Token: token })
                }
                else
                {
                    res.send(result.recordset[0])
                }
            })
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})


router.post('/register', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let tr = await pool.request()
            .input("email", sql.VarChar, "victor@gmail.com")
            .input("password", sql.NVarChar, "12345")
            .execute("usp_registerUser").then(result => {
                res.send(result.recordset[0]);
            })
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
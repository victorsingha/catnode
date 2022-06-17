const express = require('express')
const router = express.Router();
const jwtService = require('../Services/jwt')
const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../Services/dbConfig')


router.post('/login', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let request = req.body;
        console.log(request)
        await pool.request()
            .input("email", sql.VarChar, request.email)
            .input("password", sql.NVarChar, request.password)
            .execute("usp_loginUser").then(result => {
                if(result.recordset[0].StatusCode == "S")
                {
                    let obj = {
                        email:request.email,
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
        let request = req.body;
        await pool.request()
            .input("email", sql.VarChar, request.email)
            .input("password", sql.NVarChar, request.password)
            .execute("usp_registerUser").then(result => {
                res.send(result.recordset[0]);
            })
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})


router.get('/authenticate', jwtService.authenticateToken, (req, res) => {
    try {
        res.send(req.body)
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})




module.exports = router;
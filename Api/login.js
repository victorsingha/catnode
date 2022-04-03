const express = require('express')
const router = express.Router();
const jwtService = require('../Services/jwt')
// const sql = require('mssql')
const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../Services/dbConfig')
const st = require('../Models/mdlStatus');

// router.get('/translation',async (req,res)=>{
//     try{
//         let pool = await sql.connect(dbConfig);
//         let translation = await pool.request().query("Select * from  table_translation");
//         return translation.recordsets;
//         res.send(await user.find())
//     }catch(err){
//         res.send(err);
//     }
// })

router.get('/translation/:language', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let tr = await pool.request()
            .input("Language", sql.VarChar, req.params.language)
            .execute("usp_getTranslations").then(result => {
                let list = result.recordsets[0];
                let translation = "{";
                list.forEach(obj =>{
                    translation = translation +`"`+obj.Code+`" : "`+obj.Translation+`",`
                })
                translation = translation + `}`
                translation = translation.replace(/,([^,]*)$/, '$1') 
                console.log(JSON.parse(translation))
                res.send(JSON.parse(translation))
            })
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})


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

router.get('/authenticate', jwtService.authenticateToken, (req, res) => {
    try {
        res.send(req.body)
    } catch (err) {
        res.send({StatusCode:'F',StatusMessage:err.message})
    }
})




module.exports = router;
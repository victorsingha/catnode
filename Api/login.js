const express = require('express')
const router = express.Router();
const jwtService = require('../Services/jwt')
const mdlTranslation = require('../Models/mdlTranslation')
// const sql = require('mssql')
const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../Services/dbConfig')

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

router.get('/translation/:language',async (req,res)=>{
    try{
        let pool = await sql.connect(dbConfig);
        let tr = await pool.request()
        .input("Language",sql.VarChar,req.params.language)
        .execute("usp_getTranslations").then(result=>{
            res.send(result.recordsets)
        })
    }catch(err){
        res.send(err);
        console.log(err)
    }
})


router.post('/login',async(req,res)=>{
    try{
        // const result = await user.findOne(req.body)
        // if(result ==  null){
        //     res.send({result:"Invalid Credentials"})
        //     return
        // }else{
        //     let obj = {
        //         email:result.email,
        //     }
        //     const token = jwtService.generateAccessToken(obj)
        //     res.send({token:token})
        // }
        const token = jwtService.generateAccessToken(obj)
        res.send({token:token})
    }catch(err){
        res.send(err)
    }
})

router.get('/authenticate',jwtService.authenticateToken,(req,res)=>{
try{
res.send(req.body)
}catch(err){
res.send(err)
}
})




module.exports = router;
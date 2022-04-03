const express = require('express')
const router = express.Router();
const sql = require('mssql/msnodesqlv8')
const dbConfig = require('../Services/dbConfig')

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

module.exports = router;
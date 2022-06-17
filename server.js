const express = require('express')
const app = express()
const user = require('./Api/user')
const common = require('./Api/common')
var bodyParser = require('body-parser')
 
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())
app.use('/api/user',user)
app.use('/api',common)


app.get('*',(req,res)=>{
    res.status(404).send({StatusCode:'F',StatusMessage:'API route not found.'})
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
const express = require('express')
const app = express()
const user = require('./Api/user')
const common = require('./Api/common')
const port = process.env.PORT || 3000



app.use(express.json())
app.use('/api/user',user)
app.use('/api',common)


app.get('*',(req,res)=>{
    res.status(404).send({StatusCode:'F',StatusMessage:'API route not found.'})
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
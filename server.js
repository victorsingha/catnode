const express = require('express')
const app = express()
const loginApi = require('./Api/login')
const port = process.env.PORT || 3000



app.use(express.json())
app.use('/login',loginApi)


app.get('*',(req,res)=>{
    res.status(404).send("Oops!404")
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
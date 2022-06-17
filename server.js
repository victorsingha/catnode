const express = require('express')
const app = express()
const user = require('./Api/user')
const common = require('./Api/common')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express') 
const port = process.env.PORT || 3000

const swaggerOption={
  definition:{
    openapi:'3.0.0',
    info:{
      title:'NJSYEVV',
      version:'1.0.0.0',
      description:'We are under developement',
      contact:{
        name:'Victor'
      },
      servers:[
        {
          url:'http://localhost:3000/'
        }
      ]
    }
  },
  apis:['server.js']
}

const swaggerDocs=swaggerJsDoc(swaggerOption);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

// http://localhost:3000/api-docs/

app.use(express.json()),
app.use(express.urlencoded({extended: false})); 


app.use('/api/user',user)
app.use('/api',common)


app.get('*',(req,res)=>{
    res.status(404).send({StatusCode:'F',StatusMessage:'API route not found.'})
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
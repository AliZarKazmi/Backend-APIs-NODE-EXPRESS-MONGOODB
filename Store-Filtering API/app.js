require('dotenv').config()

//async error - avoid try catch repition in routes 
require('express-async-errors')

const express = require("express")
const app = express()

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//midleware
app.use(express.json())

//route
app.get('/',(req,res)=>{
    res.send('<h1>Store API </h1><a href="/api/v1/products">Prodcuts route</a>')
})

//prodcuts routes
app.use('/api/v1/products',productRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000
const start = async (req,res)=>{
    try {
        //connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running at port: ${port}...`)) 
    } catch (error) {
        console.log(error)
    }
}

start();
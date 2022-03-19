const colors = require('colors') 
const dotenv = require('dotenv').config()
const express = require('express')
const productRoutes = require('./routes/productRoutes')
const connectDB = require('./config/db')


connectDB()

const app  = express()

app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
    res.send('API is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

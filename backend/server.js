const colors = require('colors')
const dotenv = require('dotenv').config()
const path = require('path');
const express = require('express')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const connectDB = require('./config/db');

connectDB()

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const dirname = path.resolve()
app.use('/uploads', express.static(path.join(dirname, '/uploads')))


app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('API is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

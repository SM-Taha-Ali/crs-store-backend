// Import express and connection arrow function
const connection = require('./db_conn');
const express = require('express')
var cors = require('cors')

// Connection to MongoDB
connection();

const app = express()
const port = process.env.PORT || 5000 
app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api/wish', require('./routes/wish.js'))
app.use('/api/mail', require('./routes/mail.js'))


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
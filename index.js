// Import express and connection arrow function
const connection = require('./db_conn');
const express = require('express')
var cors = require('cors')

// Connection to MongoDB
connection();

const app = express()
const port = 5000 
app.use(cors())
app.use(express.json())


app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/payment', require('./routes/payment'))


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
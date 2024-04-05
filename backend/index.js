const express = require('express');
const { Database_connection } = require('./database/server');
require('dotenv').config()
const cors = require('cors');
const { UserRouter } = require('./routes/user.route');
const { CategoryRouter } = require('./routes/category.route');
const { ProductRouter } = require('./routes/product.route');
const { authenticateToken } = require('./middleware/authenticate.middleware');

const app = express();
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Backend Server")
})

app.use('/user', UserRouter)
app.use('/', authenticateToken, CategoryRouter)
app.use('/', authenticateToken, ProductRouter)

app.listen(process.env.port, async () => {
    try {
        await Database_connection
        console.log({ msg: "Backend is Connected with database" })
    } catch (error) {
        console.log({ error: error })
    }
    console.log(`backend is Running on the port ${process.env.port}`)

})
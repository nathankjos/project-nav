const
    express = require('express')
    app = express()
    logger = require('morgan')
    bodyParser = require('body-parser')
    ejsLayouts = require('express-ejs-layouts')
    axios = require('axios')
    dotenv = require('dotenv')
    mongoose = require('mongoose')
    PORT = 3000

app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost/Project-Navigator', (err) => {
    console.log(err||"Connected to MongoDB")
})

app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT}`)
})
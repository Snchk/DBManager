const express = require('express')
const mongoose= require('mongoose')
const path=require('path')
const bodyParser=require('body-parser')
const passport=require('passport')
const cors=require('cors')
const morgan=require('morgan')
const authRoutes = require('./routes/auth.js')
const clientRoutes = require('./routes/client.js')
const keys = require('./config/keys')
const app = express()

/*connect mongo*/
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    // we're connected!
    console.log(`MongoDB connected!`)
})

/*connect mysql*/

/**/

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(morgan('dev'))
app.use('/uploads',express.static('uploads'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(`/api/auth`, authRoutes)
app.use(`/api/client`, clientRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

module.exports = app
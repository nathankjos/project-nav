require('dotenv').load()
const
    express = require('express'),
    path = require('path'),
    app = express(),
    ejs = require('ejs'),
    logger = require('morgan'),
    methodOverride = require('method-override')
    bodyParser = require('body-parser'),
    ejsLayouts = require('express-ejs-layouts'),
    axios = require('axios'),
    dotenv = require('dotenv').config(),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    nss = require('node-suggestive-search').init({
        dataBase: "mongodb", 
        mongoDatabase: "mongodb://127.0.0.1:27017/nodeSugestiveSearch",
        cache: true
        }),
    passport = require('passport'),
    flash = require('connect-flash'),
    passportConfig = require('./config/passport.js'),
    projectsRouter = require('./routes/projects.js'),
    usersRouter = require('./routes/users.js'),
    Project = require('./models/Project.js')

// environment port
const
	port = process.env.PORT || 3000,
	mongoConnectionString = process.env.MONGODB_URI || 'mongodb://localhost/Project-Nav'

// mongoose connection
mongoose.connect(mongoConnectionString, (err) => {
	console.log(err || "Connected to MongoDB (Project-Nav)")
})

// will store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
  });

// middleware
app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))


app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(session({
    secret: "booooooom",
    cookie: { maxAge: 60000000 },
    resave: true,
    savedUninitialized: false,
    store: store
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next) => {
    app.locals.currentUser = req.user;
    app.locals.isLoggedIn = !!req.user
    next();
})

//root route
app.get('/', (req,res) => {
    Project.find({}, (err, projects) => {
        if(err) return console.log(err)
        res.render('index', {projects: projects})
    })  //view who current user is
})

app.get('/:username/chat', (req,res) => {

    console.log(app.locals.currentUser) 
    console.log(app.locals.currentUser.username)
    console.log(req.params.username)
    res.render('chat')
    
})

app.get('users/chat', (req,res)=>{
    res.render('chat')
})
app.use('/projects', projectsRouter)
app.use('/users', usersRouter)

app.listen(port, (err) => {
	console.log(err || "Server running on port " + port)
})
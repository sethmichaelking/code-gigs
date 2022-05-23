const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Handlebars = require('handlebars')
const path = require('path')
const app = express()
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const db = require('./config/database')


//handlebars
app.use(bodyParser.urlencoded({ extended: false }))

app.engine('handlebars', exphbs.engine({ 
    defaultLayout: 'main',  
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


//set statcic folder
app.use(express.static('public'))


//test db
db.authenticate()
.then(() => console.log('db connected'))
.catch((err) => console.log(err))

  
const PORT = process.env.port || 5002


//index route
app.get('/', (req, res) => {
    res.render('index')
})




// Gig routes
app.use('/gigs', require('./routes/gigs'))



app.listen(5002, () => {
    console.log(`Sever started on ${PORT}`)
})
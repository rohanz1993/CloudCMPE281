console.log('May Node be with you');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser= require('body-parser')


app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
var db

MongoClient.connect('mongodb://ec2-52-26-15-244.us-west-2.compute.amazonaws.com/test', (err, database) => {
	//changed ip
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
});
	  
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
});

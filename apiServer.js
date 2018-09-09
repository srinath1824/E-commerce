var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs
var mongoose = require('mongoose');
//Local DB
//mongoose.connect('mongodb://localhost:27017/bookshop');

//MONGO LAB
mongoose.connect('mongodb://testUser:Test@123@ds149732.mlab.com:49732/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error'));
// ------>> SET UP SESSION <<--------
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))
//SAVE SESSION CART API
app.post('/cart', function(req,res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
})
//GET SESSION CART API
app.get('/cart', function(req, res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

// ------->> END SESSION SET <<--------

var Books = require('./models/books');

//------>> POST BOOKS <<-------------
app.post('/books', function(req,res){
  var book = req.body;

  Books.create(book, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//------>>> GET BOOKS <<<---------
app.get('/books', function(req,res){
  Books.find(function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//----->> DELETE BOOKS <<--------
app.delete('/books/:_id', function(req,res){
  var query = {_id: req.params._id}

  Books.remove(query, function(err, books){
    if(err){
      console.log("# API DELETE BOOKS: ", err);
    }
    res.json(books);
  })
})

//----->> UPDATE BOOKS <<---------
app.put('/books/:_id', function(req,res){
  var book = req.body;
  var query = req.params._id;
  //if the field dosent exists $set will set a new field
  var update = {
    '$set' :{
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  //when true returns the updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, function(err, books){
    if(err){
      throw err;
    }
    res.json(books);
  })

})

// ---->>> GET BOOKS IMAGES API <<<-----
app.get('/images', function(req,res){
  
  const imgfolder = __dirname + '/public/images';
  //REQUIRE FILE SYSTEM
  const fs = require('fs');
  //READ ALL FILES IN THE DIRECTORY
  fs.readdir(imgfolder, function(err, files){
    if(err){
      return console.error(err);
    }
    //CREATE AN EMPTY ARRAY
    const filesArr = [];
    //ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
    files.forEach(function(file){
      filesArr.push({name: file});
    });
    //SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(filesArr);
  })
})


//END APIs
app.listen(3002,function(err){
  if(err){
    return console.log(err);
  }
  console.log("API Server is UP and Running in port 3002");
});

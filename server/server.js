// Set up
var app = require('express')();
var server = app.listen(8080);
var io = require('socket.io')(server);

var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/reviewking',{useMongoClient: true});

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Review = mongoose.model('Review', {
    title: String,
    description: String,
    rating: Number,
    time: Date,
});

// Routes

    // Get reviews
    app.get('/api/reviews', function(req, res) {
        console.log("fetching reviews");
        // use mongoose to get all reviews in the database
        Review.find({}).sort('-time').exec(function(err, reviews) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(reviews); // return all reviews in JSON format
        });
    });

    // create review and send back all reviews after creation
    app.post('/api/reviews', function(req, res) {
        console.log("creating review");
        // create a review, information comes from request from Ionic
        Review.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            time : req.body.time,
        }, function(err, review) {
            if (err)
                res.send(err);
            // return the newly created review
            res.json(review);
        });

    });

    // delete a review
    app.delete('/api/reviews/:review_id', function(req, res) {

        Review.remove({
            _id : req.params.review_id
        }, function(err) {
          if(err)
              res.send(err);
          // get and return all the reviews after you delete one
          Review.find(function(err, reviews) {
              if(err)
                  res.send(err)
              res.json(reviews);
          });
        });

    });


    var chat = io.of('/chat')
      .on('connection', (socket) => {
      console.log('USER CONNECTED');

      socket.on('disconnect', function(){
        console.log('USER DISCONNECTED');
      });

      socket.on('add-message', (message) => {
        io.of('/chat').emit('message', {type:'new-message', text: message});
      });
    });


// listen (start app with node server.js) ======================================
//app.listen(8080);
console.log("App listening on port 8080");

var express = require('express')
var app = express() 
var port = process.env.PORT || 3000
var path = require('path');
var bodyParser = require('body-parser');
var swig = require('swig');
var fs = require('fs');
var cookieParser = require("cookie-parser");
var multipart = require("multipart")
var session = require("express-session");

var dbUrl = "mongodb://127.0.0.1:27017/test";
var mongoose = require("mongoose");
var db = mongoose.connect(dbUrl);

var MongoStore = require('connect-mongo')(session)

db.connection.on("error", function (error) {
    console.log("mongodb connected error! info:" + error);
});
db.connection.on("open", function () {
    console.log("------mongodb connected!!!!------");
});


// var UsersSchema = new mongoose.Schema({
// 	  userName : { type:String },
// 	  passWord  : { type:String },
// 	  time : { type:Date, default:Date.now }
// });
// var UsersModel = db.model("users", UsersSchema );
// var userEntity = new UsersModel({
// 	userName: "admin",
//     passWord: "admin"
// });

// entity.save(function(err,info){
// 	console.log("save sucess!")
// });

// models loading
// var models_path = __dirname + '/app/models'
// var walk = function(path) {
//   fs
//     .readdirSync(path)
//     .forEach(function(file) {
//       var newPath = path + '/' + file
//       var stat = fs.statSync(newPath)

//       if (stat.isFile()) {
//         if (/(.*)\.(js|coffee)/.test(file)) {
//           require(newPath)
//         }
//       }
//       else if (stat.isDirectory()) {
//         walk(newPath)
//       }
//     })
// }

// walk(models_path);

app.engine( 'html', swig.renderFile);
app.set('views','./app/views')
app.set('view engine', 'html')


app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'assets')));

var webRouter = require('./config/routes');




app.use(cookieParser());

app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
    store:new MongoStore({
      url: 'mongodb://localhost/test',
      ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}))

app.use('/', webRouter);
console.log("iiiii")

// app.get('/',function(req, res) {
//   console.log("index access!")
// 	res.render("index",{
// 		title: "棣栭〉",
// 		description: "blog"
// 	})
// })

// app.get('/register',function(req, res) {
// 	res.render("register/index",{
// 		title: '鐧诲綍',
// 		description: "login"
// 	})
// })

// app.post('register',function(req,res){
// 	res.render();
// })

// app.get('/login',function(req, res) {
// 	res.render("login",{
// 		title: '鐧诲綍',
// 		description: "login"
// 	})
// })

// app.post('/login_check',function(req, res){
// 	// var req = req;
// 	// var res = res;
//  //    UsersModel.find({userName:req.body.name},function(err,docs){
// 	//    console.log(docs[1]);
// 	//    if(req.body.name == docs.userName && req.body.pwd == docs.passWord) {
// 	//    	 console.log("go to the index page")
// 	//    	 res.render("index",{
// 	// 	title: '脦垄赂枚脠脮鹿芒脠脮',
// 	// 	description: "blog"
// 	// })
// 	//    }else {
// 	//    	 res.send(302);
// 	//    }
//  //    })
//     res.redirect("/"); 
// })

app.listen(port);


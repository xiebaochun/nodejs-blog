var Artical = require("../models/article")
var markdown = require( "markdown" ).markdown;

var Entities = require('html-entities').AllHtmlEntities;
 
entities = new Entities();

exports.publish = function(req,res){
	var _artical = req.body;
	console.log(_artical.publish)
	if(typeof(_artical.publish)=="undefined"){
		console.log("markdown change to the html")
		_artical.content = markdown.toHTML( _artical.content )
	}
	
	//console.log("Into the admin publish controller")
	console.log(_artical)
	//res.send("hello");
	// Artical.findOne({title: _artical.title},function(err,artical){
	// 	 if(err){
	// 	 	console.log(err)
	// 	 }
	// 	 if(artical){
	// 	 	return res.redirect("/admin")
	// 	 }else{
	// 	 	var artical = new Artical(_artical)
	//         artical.save(function(err,artical){
	//         	if(err){
	//         		console.log(err)
	//         	}
	//         	res.redirect("/");
	//         })
	// 	 }
	// })

	var artical = new Artical(_artical)
    artical.save(function(err,artical){
    	if(err){
    		console.log(err)
    	}
    	res.redirect("/");
    })
	
}

exports.listArticals = function(req, res){

}
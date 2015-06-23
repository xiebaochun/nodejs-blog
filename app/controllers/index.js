
var Article = require("../models/article")
// var markdown = require( "markdown" ).markdown;
// console.log( markdown.toHTML( "Hello *World*!" ) );
var Entities = require('html-entities').AllHtmlEntities;
 
entities = new Entities();

exports.index = function(req,res) {
	console.log("Into the index control")
	Article.fetch(function(err,articles){
		//console.log(articles)
		if(err){
			console.log(err);
		}
		articles.forEach(function(entry){
			console.log(entry._id)
			entry.content = entities.decode(entry.content)
		})
		res.render("index",{
			title: "首页",
			description: "blog",
			session:req.session,
			articles: articles
	    })
	});
	
}

exports.admin = function(req,res) {
	console.log("Into the index control");
	res.render("admin",{
		title: "后台",
		description: "blog",
		session:req.session
	})
}


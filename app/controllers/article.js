var Article = require("../models/article")

exports.index = function(req,res) {
	var article_id = req.params._id
	console.log("sdfs"+article_id)
	Article.findOne({_id:article_id},function(err,entry){
		if(err){
			console.log(err)
		}
		console.log(entry)
		res.render('article',{article:entry})
	})

	
}
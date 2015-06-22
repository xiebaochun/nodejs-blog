var Artical = require("../models/artical")

exports.index = function(req,res) {
	var artical_id = req.params._id
	console.log("sdfs"+artical_id)
	Artical.findOne({_id:artical_id},function(err,entry){
		if(err){
			console.log(err)
		}
		console.log(entry)
		res.render('artical',{artical:entry})
	})

	
}
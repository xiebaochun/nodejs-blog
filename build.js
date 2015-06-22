var fs = require("fs");
var _ = require("lodash");
var jade = require('jade');

var options = {
	title: "娱家-文儿",
	description: "文儿，娱家-文儿，yy主播，yy最佳女歌手"

}
function writeTemplate(options) {
	var jadefile = fs.readFileSync("./views/index.jade");
	var jadetemplate = jade.compile(jadefile, {
		compileDebug: false,
		debug: false,
		pretty: true
	});
	var html = jadetemplate(options);
	fs.writeFileSync("./dist/index.html", html);
}

exports.run = function(options){
	writeTemplate(options);
	console.log("building..........................");
}

exports.run(options);
var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ArticleSchema = new Schema({
	title          : {type:String,index:true,unique:true},
	cate           : {type:String},
	content        : {type:String},
	publish        : {type:String},
	checkcounts    : {type:Number,default:100},
    meta           : {
				        createAt: {
				    	    type:Date,
					        default: Date.now()
				        },
				        updateAt: {
				        	type:Date,
				         	default: Date.now()
				        }
	}
})

ArticleSchema.pre('save',function  (next) {
    if (this.isNew) {
       this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
       this.meta.updateAt = Date.now()
    }
    next()
})

ArticleSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = mongoose.model("Article",ArticleSchema)
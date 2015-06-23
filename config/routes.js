var express = require('express');
var User = require('../app/controllers/user')
var Index = require('../app/controllers/index')
var Admin = require('../app/controllers/admin')
var Article = require('../app/controllers/article')

var router = express.Router();


console.log(Admin.publish)

// home page
router.get('/', Index.index);

router.get('/admin',Index.admin)

router.post('/admin/publish', Admin.publish)

console.log("Into the routes module");

router.post('/user/signup', User.signup)

router.get('/user/signup', User.showSignup)

router.get('/user/signin',User.showSignin)

router.post('/user/signin',User.signin)

router.get('/user/logout',User.logout)

router.get('/article/:_id',Article.index)



module.exports = router;
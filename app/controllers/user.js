var mongoose = require('mongoose')
require("../models/user")

var User = mongoose.model('User')

// signup
exports.showSignup = function(req, res) {
  res.render('register/', {
    title: '注册页面' 
  })
}

exports.showSignin = function(req, res) {
  res.render('login', {
    title: '登录页面'
  })
}

exports.signup = function(req, res) {
  var _user = req.body

  User.findOne({name: _user.username},  function(err, user) {
    if (err) {
      console.log(err)
    }

    if (user) {
      return res.redirect('/signin')
    }
    else {
      user = new User(_user)
      user.save(function(err, user) {
        if (err) {
          console.log(err)
        }

        res.redirect('/')
      })
    }
  })
}

// signin
exports.signin = function(req, res) {
  var _user = req.body
  var name = _user.name
  var password = _user.pwd
  console.log(name);
  User.findOne({username: name}, function(err, user) {
    if (err) {
      console.log(err)
    }
    console.log(user)
    if (!user) {
      return res.redirect('./signup')
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (isMatch) {
        req.session.user = user
        return res.redirect('/')
      }
      else {
        return res.redirect('./signin')
      }
    })
  })
}

// logout
exports.logout =  function(req, res) {
  delete req.session.user
  //delete app.locals.user

  res.redirect('/')
}

// userlist page
exports.list = function(req, res) {
  User.fetch(function(err, users) {
    if (err) {
      console.log(err)
    }

    res.render('userlist', {
      title: 'imooc 用户列表页',
      users: users
    })
  })
}

// midware for user
exports.signinRequired = function(req, res, next) {
  var user = req.session.user

  if (!user) {
    return res.redirect('/signin')
  }

  next()
}

exports.adminRequired = function(req, res, next) {
  var user = req.session.user

  if (user.role <= 10) {
    return res.redirect('/signin')
  }

  next()
}
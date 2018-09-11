const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');
const checkAuth = require('./check-auth');
const router = express.Router();


//get register
router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user >=1) {
        res.json({message: "User exists"});
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({error: err});
          } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(result => {
                console.log(result);
                res.json({message: "User created", success: true});
            })
            .catch(err => {
                console.log(err);
                res.json({error: err});
            });
          }
        });
      }
    });
});

//get authenticate or user login
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (user < 1) {
            res.json({message: 'user not match', success: false});
        }

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
            const token = jwt.sign({id: user._id},"security",{expiresIn: "168h"});
                return res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
        }
        res.json({message: "password not match", success: false});
      });
    })
    .catch(err => {
        console.log(err);
    });
});

//note display
router.get('/note',checkAuth, (req, res) => {
    Note.find({user_id:req.user.id}, (err, note) => {
        res.send(note);
    });
});

//display one note
router.get('/note/:id', (req, res) => {
    Note.findById({_id: req.params.id}, (err, note) => {
        res.send(note);
    });
});

//note create
router.post('/note/create', (req, res) => {
    const note = new Note({
        title: req.body.title,
        body: req.body.body,
        user_id: req.body.user_id
    });
    note.save()
    .then((note) => {
        res.json({success: true});
    })
    .catch(err => {
        res.send(err);
    });
});

//note edit
router.put('/note/:id/edit', (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body)
    .then((note) => {
        res.json({success: true});
    })
    .catch(err => {
        res.json({success: false});
    });
});

//note delete
router.delete('/note/:id', (req, res) => {
    Note.findByIdAndRemove({_id:req.params.id}, (err, note) => {
        res.json({mg:'Note Deleted'});
    });
});


module.exports = router;
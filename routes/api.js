const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Note = require('../models/Note');
const multer = require('multer');
const checkAuth = require('./check-auth');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/storage/');
    },
    filename: function(req, file, cb) {
        cb(null , Date.now() +'.'+ file.originalname);
    }
});

const upload = multer({storage: storage});

//get register
router.post('/register', (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user >= 1) {
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
            const token = jwt.sign({id: user._id, isAdmin: false},"security",{expiresIn: "168h"});
                return res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin
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
    console.log(req.file);
    const note = new Note({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
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

//upload
router.post('/upload', upload.single('image'), (req, res) => {

res.json({originalname:req.file.originalname, uploadname: req.file.filename});
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

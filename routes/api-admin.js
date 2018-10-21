const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const route = express.Router();

//get register admin
route.post('/register', (req, res, next) => {
    Admin.findOne({ email: req.body.email })
    .then(admin => {
      if (admin >=1) {
        res.json({message: "User exists"});
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.json({error: err});
          } else {
            const admin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            admin.save()
            .then(result => {
                console.log(result);
                res.json({message: "Admin created", success: true});
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

//get authenticate or admin login
route.post('/login', (req, res, next) => {
    Admin.findOne({ email: req.body.email })
    .exec()
    .then(admin => {
        if (admin < 1) {
            res.json({message: 'Admin not match', success: false});
        }

      bcrypt.compare(req.body.password, admin.password, (err, result) => {
        if (err) throw err;

        if (result) {
            const token = jwt.sign({id: admin._id, isAdmin: true},"security",{expiresIn: "168h"});
                return res.json({
                    success: true,
                    token: token,
                    admin: {
                        id: admin._id,
                        name: admin.name,
                        email: admin.email
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

module.exports = route;
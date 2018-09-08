const express = require('express');
const bcrypt = require('bcrypt');


const tokenManagement = require('../helpers/token');

const User = require('../models/user');

const router = express.Router();

router.get('/', tokenManagement.verifyToken, (req, res) => {
    User.find()
        .select("-password, -__v") //excludes password and __v fields
        .then(users => res.status(200).send(users))
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
});


router.post('/', (req, res) => {
    let {firstname, lastname, email, password, phonenumber} = req.body;

    let data = {firstname, lastname, email, phonenumber};

    User.findOne({email})
        .then(user => {
            if (user !== null) {
                return res.send({message: "Email exists"});
            }
            else {
                let salt = bcrypt.genSaltSync(11);
                data.password = bcrypt.hashSync(password, salt);

                User.create(data, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    res.send({message: "user created", result});
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });

});


router.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email})
        .select("-__v")
        .then(user => {
            if (user === null) {
                return res.send({message: "Email/Password is incorrect"});
            }
            else {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return res.send({message: "Email/Password is incorrect"});
                    }
                    else if (result) {
                        tokenManagement.createToken(user._id)
                            .then(token => {
                                res.send({token, user});
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).send(err);
                            });
                    }
                    else {
                        return res.send({message: "Email/Password is incorrect"});
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
});

router.get('/user', tokenManagement.verifyToken, (req, res) => {
    const userId = JSON.parse(req.decoded);

    User.findById(userId)
        .select("-password, -__v")
        .then((user) => {
            res.send(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
});

router.put('/', tokenManagement.verifyToken, (req, res) => {
    const userId = JSON.parse(req.decoded);

    User.findByIdAndUpdate(userId, req.body, {new: true})
        .select("-password, -__v")
        .then((user) => {
            res.send(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
});

router.delete('/', tokenManagement.verifyToken, (req, res) => {
    const userId = JSON.parse(req.decoded);

    User.findByIdAndRemove(userId)
        .then((user) => {
            res.send({message: "user created", user});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send(err);
        });
});

module.exports = router;

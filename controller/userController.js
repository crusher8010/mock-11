const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Register = (req, res) => {
    try {

        const { avatar, name, bio, phone, email, password } = req.body;
        // console.log(req.body);

        bcrypt.hash(password, 5, async (err, spassword) => {
            if (err) {
                return console.log(err);
            } else {
                const newUser = await User.create({ avatar, name, bio, phone, email, password: spassword });

                res.status(201).json({
                    status: "success",
                    data: {
                        newUser
                    }
                })
            }
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        });
    }
}

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let getUser = await User.find({ email })

        // console.log(getUser)

        if (getUser.length > 0) {
            bcrypt.compare(password, getUser[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: getUser[0]._id }, process.env.KEY);
                    res.status(200).json({
                        message: "Login Successful",
                        id: getUser[0]._id,
                        token
                    })
                } else {
                    res.send('Wrong Crendetials')
                }
            })
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'Wrong Credentials'
            })
        }

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        });
    }
}

exports.Profile = async (req, res) => {
    try {
        let id = req.params.id;

        let user = await User.findById({ "_id": id });

        res.status(200).json({
            status: "success",
            user
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            status: "success",
            updatedUser
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            err
        });
    }
}
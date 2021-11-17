const bcryptjs = require("bcryptjs")
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/keys");

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    email: "user not found !"
                })
            }
            bcryptjs
                .compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            email: user.email,
                            tel: user.tel,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        return res.status(400).json({
                            password: "Password incorrect"
                        })
                    }
                })
                .catch(err => console.log(err));
        })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const tel = req.body.tel;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: "Email al ready exist !"
                })
            }
            return bcryptjs
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        tel: tel,
                        firstName: firstName,
                        lastName: lastName,
                        password: hashedPassword,
                        cart: { items: [] }
                    })
                    return user.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
                .catch(err => {
                    console.log(err)
                })
        })
}
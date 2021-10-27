const express = require("express")
const router = express.Router()
const Users = require("../../models/user")
const bcryptjs = require("bcryptjs")

router.post("/register", (req, res) => {
    Users.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email al reasy exist !'
            })
        } else {
            const newUser = new Users({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Users.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    email: 'User not found !'
                })
            }
            bcryptjs.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    res.json({ message: "Success !" })
                } else {
                    return res.status(400).json({
                        password: "Password incorrect"
                    })
                }
            })
        })
})

module.exports = router
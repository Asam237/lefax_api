const express = require("express")
const router = express.Router()
const Users = require("../../models/user")
const bcryptjs = require("bcryptjs")

router.post("/register", (req, res) => {
    async function userRegistration() {
        let response = await Users.findOne({ email: req.body.email });
        if (response) {
            return res.status(400).json({
                email: 'Email al ready exist !'
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
    }
    userRegistration()
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    async function userLogin() {
        let response = await Users.findOne({ email })
        if (!response) {
            return res.status(400).json({
                email: "User not found !"
            })
        }
        let isMatch = await bcryptjs.compare(password, response.password)
        if (isMatch) {
            res.json({ message: "Success !" })
        } else {
            return res.status(400).json({
                password: "Password incorrect"
            })
        }
    }

    userLogin()
})


module.exports = router
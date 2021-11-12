const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const path = require("path")
const fb = require("./fb")
const authRoutes = require("./routes/auth")
const shopRoutes = require("./routes/shop")
const adminRoutes = require("./routes/admin")
// const FacebookStrategy = require('passport-facebook').Strategy;


async function mongoDbConnection() {
    try {
        await mongoose.connect('mongodb+srv://lefax:Abbasali97@lefaxapi.dupam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        return console.log('[MongoDB] Connected');
    }
    catch (e) {
        console.log('[MongoDB] not Connected ' + e)
    }
}

mongoDbConnection()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(shopRoutes)
app.use(adminRoutes)

// passport.use(new FacebookStrategy({
//     clientID: fb.appID,
//     clientSecret: fb.appSecret,
//     callbackURL: fb.callBackUrl
// }, function (accessToken, refreshToken, profile, done) {
//     return (null, profile)
// }))


app.listen(port, () => console.log(`Server is running on ${port}`))

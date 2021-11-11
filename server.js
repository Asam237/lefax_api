const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const mongoose = require("mongoose")
const users = require("./routes/api/users")
const bodyParser = require("body-parser")
const passport = require("passport")
const FacebookStrategy = require('passport-facebook').Strategy;
const path = require("path")
const fb = require("./fb")
const authRoutes = require("./routes/auth")


app.use('/', express.static(path.join(__dirname, '/template')))

app.set('view engine', 'ejs')

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
app.use("/api/users", users)
app.use(authRoutes)

passport.use(new FacebookStrategy({
    clientID: fb.appID,
    clientSecret: fb.appSecret,
    callbackURL: fb.callBackUrl
}, function (accessToken, refreshToken, profile, done) {
    return (null, profile)
}))

// app.get("/", (req, res) => {
//     res.render("./views/pages/index.ejs")
// })


app.listen(port, () => console.log(`Server is running on ${port}`))

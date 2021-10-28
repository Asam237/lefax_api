const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const users = require("./routes/api/users")
const bodyParser = require("body-parser")

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

app.listen(port, () => console.log(`Server is running on ${port}`))

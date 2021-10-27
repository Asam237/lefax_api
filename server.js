const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const mongoose = require("mongoose")
const users = require("./routes/api/users")
const bodyParser = require("body-parser")

mongoose.connect('mongodb+srv://lefax:Abbasali97@lefaxapi.dupam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Database Connected');
    })
    .catch(err => {
        console.log('Database not Connected ' + err)
    });


app.get("/", (req, res) => res.send("Hellp world"))
app.use(bodyParser.json())
app.use("/api/users", users)

app.listen(port, () => console.log(`Server is running on ${port}`))

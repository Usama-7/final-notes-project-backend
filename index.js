const express = require('express');
const dbConnection = require('./db/config');
const dotenv = require('dotenv')
const cors = require('cors')
const Exercise = require("./db/Exercise")
const app = express();
app.use(express.json());
dbConnection();
dotenv.config();
app.use(cors());


// Add activity in MongoDb
app.post("/addactivity", async (req, resp) => {
    let note = new Exercise(req.body)
    let result = await note.save();
    resp.send(result)
})

// getting Data from MongoDb

app.get("/activities", async (req, res) => {
    let nData = await Exercise.find();
    if (nData.length > 0) {
        res.send(nData)
    } else {
        res.send({ msg: "No record available here" })
    }
})

// deleting added activity
app.delete("/activities/:id", async (req, res) => {

    let delUser = await Exercise.deleteOne({ _id: req.params.id })
    res.send(delUser)

})

// Getting activity data from MongoDb on the basis of Id
app.get("/singleActivity/:id", async (req, res) => {
    let result = await Exercise.findOne({ _id: req.params.id })
    res.send(result)
})

// updating activity data

app.put("/activityDetail/:id", async (req, res) => {
    let result = await Exercise.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})


//port

const PORT = process.env.port || 8000

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT} in ${process.env.App_Mod}`)
})
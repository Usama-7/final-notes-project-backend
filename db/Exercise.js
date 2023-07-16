const mongoose = require('mongoose');

const experciseSchema = new mongoose.Schema({
    name: String,
    disc: String,
    activity: String,
    duration: String,
    dateof: String,
    
    time: {
        type: String,
        default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      },
      date: {
        type: Date,
        default: () => new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })
      }
    
},

)

module.exports = mongoose.model("exercise",experciseSchema)


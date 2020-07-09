const mongoose = require('mongoose')
const uniequeVlidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('Connection to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('"error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

personSchema.plugin(uniequeVlidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
    }
})


module.exports = mongoose.model("Person", personSchema)
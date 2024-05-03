const mongoose = require('mongoose')


const sectionSchema = mongoose.Schema({
    id: { type: String},
    title:  { type: String, required: true},
    content:  { type: String}
})  

module.exports =  mongoose.model('Section', sectionSchema)
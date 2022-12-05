// Courses Schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    Teacher: {
        type: String,
        required: true
    }
}, { timestamps:true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
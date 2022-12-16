// Courses Schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/user")

const courseSchema = new Schema({
    course: {
        type: String,
        required: [true, 'Please enter a course name.']
    },
    teacher: {
        type: String,
        required: [true, 'Please add the instructor.']
    }
//    Students: {
//      type: String
//    }
}, { timestamps:true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
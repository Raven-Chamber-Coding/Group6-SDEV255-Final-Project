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
    },
    description: {
      type: String
    },
    subject: {
      type: String,
      required: [true, 'Please add subject.']
    },
    length: {
      type: String,
      required: [true, 'Please add course length']
    },
    points: {
      type: String,
      required: [true, 'Please add course credits']
    }
//    Students: {
//      type: String
//    }
}, { timestamps:true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
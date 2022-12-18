// Courses attended by user

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usercourseSchema = new Schema({
    course: {
        type: String,
        required: [true, 'course name']
    },
    teacher:{
        type: String,
        required: [true, 'teacher name']
    }
}, { timestamps:true });

const Usercourse = mongoose.model("Usercourse", usercourseSchema);
module.exports = Usercourse;
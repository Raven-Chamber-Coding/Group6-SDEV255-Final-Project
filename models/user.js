// User Schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: [6, 'Please enter a password at least 6 characters long.']
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your name.'],
        unique: false
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your name.'],
        unique: false
    },
    // role: { 
    //     type: String, 
    //     enum: ['roleTeacher', 'roleStudent'] 
    // }
}, { timestamps:true });

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.post('save', function(doc, next){
    console.log('new user was created', doc);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        } throw Error('Incorrect password.');
    } throw Error('Incorrect email.');
}

const User = mongoose.model("User", userSchema);
module.exports = User;
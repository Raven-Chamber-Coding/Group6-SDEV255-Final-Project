const User = require("../models/user");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "that email is not registered";
    }
    
    // incorrect password
    if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
    }

    // duplicate error code
    if (err.code === 11000) {
        errors.email = "that email is alreasy registered";
        return errors;
    }

    // validation error
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] =properties.message;
        });
    }

    return errors;
}


//create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "user secret", {
        expiresIn: maxAge
    }) 
}

// exports
// homepage
module.exports.homepage_get = (req, res) => {
    res.render("homepage", { title: "Homepage" });
}
// signup
module.exports.signup_get = (req, res) => {
    res.render("signup", { title: "Signup" });
}
module.exports.signup_post = async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body; 

    try {
        const user = await User.create({ email, password, firstName, lastName, role });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    } catch (err) {
        handleErrors(err);
        res.status(400).json('error, user not created.');
    }
}
// login
module.exports.login_get = (req, res) => {
    res.render("login", { title: "Login" });
}
module.exports.login_post = async (req, res) => {
    const { email, password, firstName, lastName, role } = req.body; 

    try {
        const user = await User.login(email, password, firstName, lastName, role);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    } catch (err) {
        handleErrors(err);
        res.status(400).json('error, user does not exist.');
    }
}
// logout
module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
}
/* courses (does not connect to database in here?)
module.exports.course_get = (req, res) => {   
    Course.find().sort({ createdAt: -1})
      .then((result) => {
        res.render("courses", { courses: result, title: "Courses" })
        })
      .catch((err) => {
          console.log(err);
        })
}
module.exports.course_post = (req, res) => {
    const course = new course(req.body);

    course.save()
      .then((result) => {
          res.redirect("/courses");
      })
      .catch((err) => {
          console.log(err);
      })
}
module.exports.course_details = (req, res) => {
    const id = req.params.id;
    Course.findById(id)
      .then(result => {
        res.render("details", { course: result, title: "Course Details" });
      })
      .catch(err => {
        console.log(err);
      });
}
module.exports.course_delete = (req, res) => {
    const id = req.params.id;
    
    Course.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/courses" });
        })
        .catch(err => {
            console.log(err);
        });
} */
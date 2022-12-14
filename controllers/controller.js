const User = require("./models/User");
const jwt = require("jsonwebtoken");

module.exports.homepage_get = (req, res) => {
    res.render("homepage", { title: "Homepage" });
}

module.exports.signup_get = (req, res) => {
    res.render("signup", { title: "Signup" });
}
module.exports.signup_post = (req, res) => {
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
module.exports.login_get = (req, res) => {
    res.render("login", { title: "Login" });
}
module.exports.login_post = (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await User.login(email, password);
        res.status(200).json({user: user._id});
    } catch (err) {
        res.status(400).json({})
    }
}
module.exports.course_get = (req, res) => {   
    Course.find().sort({ createdAt: -1})
      .then((result) => {
        res.render("courses", { title: "Courses",courses: result })
        })
      .catch((err) => {
          console.log(err);
        })
}
module.exports.course_post = (req, res) => {
    const course = new Course(req.body);

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
}
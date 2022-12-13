// runs server on localhost:4000

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Course = require("./models/course");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

// express app
const app = express();

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { '': '' };
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            error[properties.path] = properties.message;
        });
    }
    return errors;
}

// jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'user secret', {
        expiresIn: maxAge
    });
}

// connect to mongodb
const dbURI = "mongodb+srv://sstrange:admin123@college.nkha0pj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.static("photos"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
    res.redirect("/homepage");
});

app.get("/homepage", (req, res) => {
    res.render("homepage", { title: "Homepage" });
});

app.get("/login", (req, res) => {
    res.render("login", { title: "Log in" })
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body; 
    try {
        const user = await User.login(email, password);
        res.status(200).json({user: user._id});
    } catch (err) {
        res.status(400).json({})
    }

})

app.get("/signup", (req, res) => {
    res.render("signup", { title: "Sign up" })
});

app.post("/signup", async (req, res) => {
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
});

// course routes

app.get("/courses", (req, res) => {
    Course.find().sort({ createdAt: -1})
        .then((result) => {
            res.render("courses", { title: "Courses", courses: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post("/courses", (req, res) => {
    const course = new Course(req.body);

    course.save()
        .then((result) => {
            res.redirect("/courses");
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/courses/:id", (req, res) => {
    const id = req.params.id;
    Course.findById(id)
      .then(result => {
        res.render("details", { course: result, title: "Course Details" });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
app.delete("/courses/:id", (req, res) => {
    const id = req.params.id;
    
    Course.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/courses" });
        })
        .catch(err => {
            console.log(err);
        });
});
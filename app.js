// runs server on localhost:4000

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Course = require("./models/course");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { requireAuth, checkUser } = require("./middleware/middleware");
const Routes = require("./routes/routes");


// express app
const app = express();


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
app.get("*", checkUser);
app.get("/", (req, res) => res.render("homepage"));
//app.get("/courses", requireAuth, (req, res) => res.render("courses"));
app.use(Routes);

// course routes (not in routes as it doesnt work inside routes)
app.get("/studCourses", requireAuth, (req, res) => {
    Course.find().sort({ createdAt: -1})
        .then((result) => {
            res.render("studCourses", { title: "Student Courses", courses: result })
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get("/courses", requireAuth, (req, res) => {
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

app.get("/courses/:id", requireAuth, (req, res) => {
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

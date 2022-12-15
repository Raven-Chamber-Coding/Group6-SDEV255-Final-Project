const { Router } = require('express');
const Controller = require("../controllers/controller");

const router = Router();

router.get('/', Controller.homepage_get);
router.get("/homepage", Controller.homepage_get);
router.get('/signup', Controller.signup_get);
router.post('/signup', Controller.signup_post);
router.get('/login', Controller.login_get);
router.post('/login', Controller.login_post);
router.get('/logout', Controller.logout_get);
//router.post('/logout', () => {});
//router.get('/courses', Controller.course_get);
//router.post('/courses', Controller.course_post);
//router.get('/courses:id', Controller.course_details);
//router.delete("/courses/:id", Controller.course_delete);

module.exports = router;

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

module.exports = router;

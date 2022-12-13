const { Router } = require('express');

const router = Router();

router.get('/', () => {});
router.get('/signup', () => {});
router.post('/signup', () => {});
router.get('/login', () => {});
router.post('/login', () => {});
router.get('/logout', () => {});
router.post('/logout', () => {});
router.get('/courses', () => {});
router.post('/courses', () => {});
router.get('/courses:id', () => {});
router.delete("/courses/:id", () => {});

module.exports = router;

const userLogin = require('../controllers/LoginController');

// router
const router = require('express').Router()

//login
router.post('/', userLogin.loginUser)


module.exports = router;
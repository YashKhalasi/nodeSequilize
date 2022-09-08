const userLogin = require('../controllers/LoginController');

// router
const router = require('express').Router()

//login
router.put('/', userLogin.userVerify)
router.post('/', userLogin.resendEmail)


module.exports = router;
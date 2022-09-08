const tutorial = require('../controllers/TutorialController');

// router
const router = require('express').Router()

//products
router.post('/type', tutorial.addType)
router.get('/type', tutorial.getType)
router.post('/tutorials', tutorial.addtutorialName)
router.get('/tutorials', tutorial.getTutorial)
router.post('/tut_type', tutorial.addTutorialRelation)
router.get('/tut_type', tutorial.getTutorialRelationship)


//

module.exports = router;
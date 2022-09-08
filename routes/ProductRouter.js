const product = require('../controllers/ProductController');
const reviews = require('../controllers/ProductReviewController');

// router
const router = require('express').Router()

//products
router.post('/addProduct', product.addProducts)
router.get('/showProduct', product.getAllProducts)
router.put('/', product.updateProduct)
router.delete('/:id', product.deleteProduct)

// get product Reviews
router.get('/getProductReviews/:id', product.getProductReviews)

//ProductReviews
router.get('/allReviews',reviews.getAllReviews);
router.post('/addreviews',reviews.addReview);
module.exports = router;
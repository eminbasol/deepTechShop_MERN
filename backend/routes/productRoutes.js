const express = require('express')
const router = express.Router()
const { getProductById, getProducts, deleteProduct } = require('../controllers/productController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(getProducts)
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)

module.exports = router
const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel')
const mongoose = require('mongoose');

// @desc Fetch all products
// @route GET /api/products
// @access public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))

// @desc Fetch single products
// @route GET /api/products/:id
// @access public
router.get('/:id', asyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
                message: "Product not found",
            })
        }
    } else {
        res.status(404).json({
            message: "Invalid ID. Product not found",
        })
    }
})
)
module.exports = router
const express = require('express');
const { getAllProducts, getAllProductsStatic } = require('../controllers/products');
const router = express.Router();

const {getAllProducts, getAllProductsStatic} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProducts);
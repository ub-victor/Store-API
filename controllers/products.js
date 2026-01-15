const Product = require('../models/product');

const getAllProductsStatic = async (req, res)=>{
   const products = await Product.find({
    name: 'vase table'
   })
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res)=>{
    // This line is equivalent to const featured = req.query.featured;
    const {featured, company} = req.query;
    const queryObject ={}
    if (featured){
        queryObject.featured = featured == 'true' ? true: false;
    }
    if (company){ 
        queryObject.company = company; 
    }

    console.log(queryObject)
    // Here we to not use the {} because  req.query is already an object 
    const products = await Product.find(queryObject);
    // the above line is traslated by the db like this db.products.find({ featured: true })
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};
const Product = require('../models/product');

const getAllProductsStatic = async (req, res)=>{
    const products = await Product.find({}).sort('-name price');
    res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res)=>{
    // This line is equivalent to const featured = req.query.featured;
    const {featured, company, name, sort} = req.query;
    const queryObject ={}
    if (featured){
        queryObject.featured = featured == 'true' ? true: false;
    }
    if (company){
        queryObject.company = company;
    }
    if (name){
        // Search products whose name contains the given text (case-insensitive)
        queryObject.name = {$regex: name, $options: 'i'};
    }
    let result = Product.find(queryObject);

    if (sort && sort.trim() !== '') {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
    } else {
    result = result.sort('createdAt');
    }

    console.log(queryObject);

    const products = await result;
    // Here we to not use the {} because  req.query is already an object 
    //const products = await Product.find(queryObject);
    // the above line is traslated by the db like this db.products.find({ featured: true })
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};
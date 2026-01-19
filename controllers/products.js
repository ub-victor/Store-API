const Product = require('../models/product');

const getAllProductsStatic = async (req, res)=>{
    const products = await Product.find({price: { $gt:30}})
    .sort('price')
    .select('name price')
    .limit(4)
    .skip(1);
    res.status(200).json({products, nbHits: products.length});
    /*
    Common related operators:

        $lt: less than
        $lte: less than or equal to
        $eq: equal to
        $ne: not equal to
        $in: in a list of values
        $nin: not in a list of values
    */
}

const getAllProducts = async (req, res)=>{
    // This line is equivalent to const featured = req.query.featured;
    const {featured, company, name, sort, fields,numericFilters } = req.query;
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
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        }
        const regEx = /\b(<|>=|=|=<)\b/g 
        let fielters = numericFilters.replace(
            regEx,
            (match)=>`-${operatorMap[match]}-`
        );
        filters = fielters.split(',').forEach(item => {
            const [field, operator, values] = item.split('-')
        });

        console.log(numericFilters);
    }


    let result = Product.find(queryObject);

    let sortList;

    if (sort && sort.trim() !== '') {
    sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
    } else {
    result = result.sort('createdAt');
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result= result.select(fieldsList);
    }
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit);
    //23 products , if we decide to limite it to 7, we will have 4 pages 
    console.log(queryObject);
    console.log('sort:', sort);
    console.log('sortList:', sortList);

    const products = await result;
    // Here we to not use the {} because  req.query is already an object 
    //const products = await Product.find(queryObject);
    // the above line is traslated by the db like this db.products.find({ featured: true })
    res.status(200).json({products, nbHits: products.length});
}

module.exports = {getAllProducts, getAllProductsStatic};
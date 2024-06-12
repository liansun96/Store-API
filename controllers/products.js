const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name');
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name , sort } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    //$regex => $options =>Mongo DB query operators => Case Insensicivity
    queryObject.name = { $regex : name , $options : 'i'}
  }
  let result  = Product.find(queryObject);
  console.log(queryObject);

  if(sort){
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
    console.log(sortList);
  } else{
    result = result.sort(createdAt)
  }

  const products = await result
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };

const { query } = require("express");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // const products = await Product.find({}).sort('name').select('name rating company').limit(10).skip(9);
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name rating company price");
  res.status(200).json({ nbHits: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    //$regex => $options =>Mongo DB query operators => Case Insensicivity
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    
    const options = ['price' , 'rating']
    filters = filters.split(',').forEach((item)=>{
      const [field , operator , value] = item.split('-')
      if(options.includes(field)){
        queryObject[field] = {[operator] : Number(value)}
      }
    })

    //price>30,rating>=4
    // console.log(numericFilters);
    //price-$gt-30,rating-$gte-4
    // console.log(filters);
  }

  let result = Product.find(queryObject);
  console.log(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
    console.log(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //Select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
    console.log(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.limit(limit).skip(skip);

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = { getAllProducts, getAllProductsStatic };

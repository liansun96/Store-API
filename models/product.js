const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type : String,
        require : [true , 'Product name must be provided']
    },
    price:{
        type : Number,
        require : [true , 'Pruduct price must be provided']
    },
    rating:{
        type : Number,
        default : 4.5
    },
    featured:{
        type : Boolean,
        default : false
    },
    createdAt:{
        type : Date,
        default : Date.now()
    },
    company:{
        type : String,
        enum : {
            values : ['ikea','liddy','caressa','marcos'],
            message : '{VALUE} is not supported'
        }
    }
})

module.exports = mongoose.model('Product' , productSchema)
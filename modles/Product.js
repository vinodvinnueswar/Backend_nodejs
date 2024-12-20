

const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
   
    productName:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    category:{
       type:[
        {
            type:String,
            enum:["veg","non-veg"]
        }

       ]
    },
    image:{
        type:String,
    },
    bestseller:{
        type:Boolean,
    },
    description:{
        type:String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Firm'
        }
    ]


})

const Product = mongoose.model('Product',productSchema)

module.exports = Product
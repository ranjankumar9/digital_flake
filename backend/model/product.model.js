const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    image:{type:String, required:true},
    name:{type:String, required:true},
    packsize:{type:String, required:true},
    category:{type:String, required:true},
    mrp:{type:Number, required:true},
    status:{type:String, required:true}
},{
    versionKey:false
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = {
   ProductModel
}

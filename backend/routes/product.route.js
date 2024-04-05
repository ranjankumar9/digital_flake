const express = require("express");
const { ProductModel } = require("../model/product.model");



const ProductRouter = express.Router();

ProductRouter.get("/product", async (req, res) => {
    try {
        const table = await ProductModel.find({})
        res.status(200).json({ data: table, msg: "Product data!" })
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error!" })
    }
})

ProductRouter.post("/product/add", async (req, res) => {
    try {
        const { name, description, status, image, mrp, packsize } = req.body;
        const table = new ProductModel({ name, description, status, image, mrp, packsize })
        await table.save()
        res.status(201).json({ msg: "Product data Added Successfully!" })
    } catch (err) {
        res.status(500).json({ msg: "Product data Added Failed!", error: err })
    }
})

ProductRouter.patch("/product/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, status, image, mrp, packsize } = req.body;
    const params = { name, description, status, image, mrp, packsize }
    try {
        const table = await ProductModel.findByIdAndUpdate({ _id: id }, params)
        res.status(201).json({ msg: "Product Data Updated Successfully!", data: table })
    } catch (err) {
        res.status(500).json({ msg: "Product Data Updated Failed!", error: err })
    }
})

ProductRouter.delete("/product/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const table = await ProductModel.findByIdAndDelete({ _id: id })
        res.status(201).json({ msg: "Product Data Deleted Successfully", data: table })
    } catch (err) {
        res.status(500).json({ msg: "Product Data Deletetion Failed!", error: err })
    }

})


module.exports = {
    ProductRouter
}
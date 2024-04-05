const express = require("express");
const { CategoryModel } = require("../model/category.model");


const CategoryRouter = express.Router();

CategoryRouter.get("/category", async (req, res) => {

    try {
        const { name } = req.query;
        if (name) {
            const data = await CategoryModel.find({ name })
            res.send({ data })
        }
        else {
            const table = await CategoryModel.find({})
            res.status(200).json({ data: table, msg: "category data!" })
        }
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error!" })
    }
})

CategoryRouter.post("/category/add", async (req, res) => {
    try {
        const { name, description, status } = req.body;
        const table = new CategoryModel({ name, description, status })
        await table.save()
        res.status(201).json({ msg: "category data Added Successfully!" })
    } catch (err) {
        res.status(500).json({ msg: "category data Added Failed!", error: err })
    }
})

CategoryRouter.patch("/category/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const params = { name, description, status }
    try {
        const table = await CategoryModel.findByIdAndUpdate({ _id: id }, params)
        res.status(201).json({ msg: "category Data Updated Successfully!", data: table })
    } catch (err) {
        res.status(500).json({ msg: "category Data Updated Failed!", error: err })
    }
})

CategoryRouter.delete("/category/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const table = await CategoryModel.findByIdAndDelete({ _id: id })
        res.status(201).json({ msg: "category Data Deleted Successfully", data: table })
    } catch (err) {
        res.status(500).json({ msg: "category Data Deletetion Failed!", error: err })
    }

})


module.exports = {
    CategoryRouter
}
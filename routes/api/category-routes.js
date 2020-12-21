const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
    // find all categories
    Category.findAll({ include: [Product] }).then((data) => res.json(data));
    // be sure to include its associated Products
});

router.get("/:id", async(req, res) => {
    console.log("here's your id - ", req.params.id);
    // find one category by its `id` value
    Category.findByPk(req.params.id, { include: [Product] }).then((data) =>
        res.json(data),
    );
    // be sure to include its associated Products
});

router.post("/", async(req, res) => {
    // create a new category
    try {
        const catData = await Category.create({
            dataTypes: req.body.dataTypes,
        });
        res.status(200).json(catData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async(req, res) => {
    // update a category by its `id` value
    // try {
    //     const
    // }
    try {
        const updateData = await Category.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(updateData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", async(req, res) => {
    // delete a category by its `id` value
    try {
        const categoryData = await Category.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!categoryData) {
            res.status(404).json({ message: "No category found with that ID" });
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
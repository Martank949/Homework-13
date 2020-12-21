const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async(req, res) => {
    // find all tags
    try {
        const tagData = await Tag.findAll({
            // Add product as a second model to JOIN with
            include: [{ model: ProductTag }, { model: Product }],
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
    // be sure to include its associated Product data
});

router.get("/:id", async(req, res) => {
    console.log("Here's your id - ", req.params.id);
    // find a single tag by its `id`
    try {
        const tagData = await Tag.findByPk(req.params.id, {
            include: [{ model: ProductTag }, { model: Product }],
        });
        if (!tagData) {
            res.status(404).json({ message: "No tag found with that ID" });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }

    // be sure to include its associated Product data
});

router.post("/", async(req, res) => {
    // create a new tag
    try {
        const tagData = await Tag.create({
            dataTypes: req.body.dataTypes,
        });
        res.status(200).json(tagData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put("/:id", async(req, res) => {
    // update a tag's name by its `id` value
    try {
        const updateData = await Tag.update(req.body, {
            where: { id: req.params.id },
        });
        res.status(200).json(updateData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", async(req, res) => {
    // delete on tag by its `id` value
    try {
        const tagData = await Tag.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!tagData) {
            res.status(404).json({ message: "No category found with that ID" });
            return;
        }
        res.status(200).json(tagData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
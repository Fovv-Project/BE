import Category from "../models/categories.model.js";

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await Category.findAll();
            res.status(200).json({
                success: true,
                code: 200,
                message: "Get category record successfully",
                data: response
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    insert: async(req, res, next) => {
        try {
            const jenisKategori = req.body.jenisKategori;

            const response = await Category.create({
                'jenisKategori': jenisKategori
            });

            res.status(201).json({
                success: true,
                code: 201,
                message: "Create new category record successfully",
                data: response
            });

        } catch (error) {
            console.log(error.message);
        }
    },

    updateId: async(req, res, next) => {
        try {
            const jenisKategori = req.body.jenisKategori;

            const response = await Category.update({
                'jenisKategori': jenisKategori
            }, {
                where: {
                    idKategori: req.params.idKategori
                }
            });

            res.status(200).json({
                success: true,
                code: 200,
                message: "Updated category successfully",
                data: response
            });

        } catch (error) {
            console.log(error.message);
        }
    },

    removeId: async(req, res, next) => {
        try {
            await Category.destroy({
                where: {
                    idKategori: req.params.idKategori
                }
            });
            res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted category successfully",
            });
        } catch (error) {
            console.log(error.message);
        }
    },
}
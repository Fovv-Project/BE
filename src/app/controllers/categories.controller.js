const db = require('../../utils/db.setup.util')
const { category } = db.models

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await category.findAll();
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get category record successfully",
                data: response
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal server error"
            })

        }
    },

    insert: async(req, res, next) => {
        if (res.locals.admin == false)
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Forbidden resource"
            })
        try {
            const jenisKategori = req.body.jenisKategori
            const response = await category.create({
                jenisKategori: jenisKategori
            });

            return res.status(201).json({
                success: true,
                code: 201,
                message: "Create new category record successfully",
                data: response
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    updateId: async(req, res, next) => {
        if (res.locals.admin == false)
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Forbidden resource"
            })
        try {
            const idKategori = req.params.id
            const jenisKategori = req.body.jenisKategori;

            const response = await category.update({
                jenisKategori: jenisKategori
            }, {
                where: {
                    idKategori: idKategori
                }
            });

            const getData = await category.findOne({
                where: {
                    idKategori: response
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated category successfully",
                data: getData
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    removeId: async(req, res, next) => {
        if (res.locals.admin == false)
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Forbidden resource"
            })
        try {
            await category.destroy({
                where: {
                    idKategori: req.params.id
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted category successfully",
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },
}
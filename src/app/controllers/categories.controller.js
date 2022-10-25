const db = require('../../utils/db.setup')
const { category } = db.models

module.exports = {
    get: async(req, res, next) => {
        if (res.locals.admin == false)
            return res.status(403).json({
                success: false,
                code: 403,
                message: "Forbidden resource"
            })

        try {
            const response = await category.findAll();
            res.status(200).json({
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
        try {
            const jenisKategori = req.body.jenisKategori;

            const response = await category.create({
                'jenisKategori': jenisKategori
            });

            res.status(201).json({
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
        try {
            const jenisKategori = req.body.jenisKategori;

            const response = await category.update({
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
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    removeId: async(req, res, next) => {
        try {
            await category.destroy({
                where: {
                    idKategori: req.params.idKategori
                }
            });
            res.status(204).json({
                success: true,
                code: 204,
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
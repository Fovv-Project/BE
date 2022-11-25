const db = require('../../utils/db.setup.util')
const { category } = db.models
const NotFoundError = require('../../errors/classes/sub/notFound.error');

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await category.findAll();
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get categories successfully",
                data: response
            });
        } catch (error) {
            next(error)

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
                message: "Create new category successfully",
                data: response
            });

        } catch (error) {
            next(error)
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

            if (response == 0)
                throw new NotFoundError("Category not found")

            const getData = await category.findOne({
                where: {
                    idKategori: idKategori
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated category successfully",
                data: getData
            });

        } catch (error) {
            next(error)
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
            const response = await category.destroy({
                where: {
                    idKategori: req.params.id
                }
            });

            if (response == 0)
                throw new NotFoundError("Category not found")

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted category successfully",
            });

        } catch (error) {
            next(error)
        }
    },
}
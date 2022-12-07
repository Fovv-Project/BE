const db = require('../../utils/db.setup.util')
const { book } = db.models
const { ForbiddenResourceError, NotFoundError } = require('../../errors/utils/errors.interface.util')

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await book.findAll();
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get all books successfully",
                data: response
            });
        } catch (error) {
            next(error)

        }
    },

    getId: async(req, res, next) => {
        try {
            const response = await book.findOne({
                where: {
                    idBuku: req.params.id
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: `Get book with id ${req.params.id} successfully`,
                data: response
            });

        } catch (error) {
            next(error)
        }
    },

    insert: async(req, res, next) => {
        try {
            if (res.locals.admin == false)
                throw new ForbiddenResourceError('Forbidden Resource.')

            const response = await book.create({
                idBuku: req.body.idBuku,
                idKategori: req.body.idKategori,
                judulBuku: req.body.judulBuku,
                pengarang: req.body.pengarang,
                penerbit: req.body.penerbit,
                tahunTerbit: req.body.tahunTerbit,
                jumlahHalaman: req.body.jumlahHalaman,
                deskripsi: req.body.deskripsi
            });

            return res.status(201).json({
                success: true,
                code: 201,
                message: "Create new book successfully",
                data: response
            });

        } catch (error) {
            next(error)
        }
    },

    updateId: async(req, res, next) => {
        try {
            if (res.locals.admin == false)
                throw new ForbiddenResourceError('Forbidden Resource.')

            const idBuku = req.params.id
            const response = await book.update({
                judulBuku: req.body.judulBuku,
                pengarang: req.body.pengarang,
                penerbit: req.body.penerbit,
                tahunTerbit: req.body.tahunTerbit,
                jumlahHalaman: req.body.jumlahHalaman,
                deskripsi: req.body.deskripsi
            }, {
                where: {
                    idBuku: idBuku
                }
            });

            if (response == 0)
                throw new NotFoundError("Book not found")

            const getData = await book.findOne({
                where: {
                    idBuku: idBuku
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated book successfully",
                data: getData
            });

        } catch (error) {
            next(error)
        }
    },

    remove: async(req, res, next) => {
        try {
            if (res.locals.admin == false)
                throw new ForbiddenResourceError('Forbidden Resource.')

            const response = await book.destroy({
                where: {
                    idBuku: req.params.id
                }
            });

            if (response == 0)
                throw new NotFoundError("Book not found")

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted book successfully",
            });

        } catch (error) {
            next(error)
        }
    },
}
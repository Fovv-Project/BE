import BorrowingHistory from "../models/borrowingHistory.model.js";

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await BorrowingHistory.findAll();
            res.status(200).json({
                success: true,
                code: 200,
                message: "Get borrow history successfully",
                data: response
            });
        } catch (error) {
            return res.status(500).send(error.message);

        }
    },

    getId: async(req, res, next) => {
        try {
            const response = await BorrowingHistory.findOne({
                where: {
                    idHistori: req.params.idHistori
                }
            });
            res.status(200).json({
                success: true,
                code: 200,
                message: `Get User with id ${req.params.idHistori} successfully`,
                data: response
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },

    insert: async(req, res, next) => {
        try {
            const Date = new Date();
            const response = await BorrowingHistory.create({
                idBuku: req.body.idBuku,
                statusPinjam: "Menunggu Approval",
                isApproved: false
            });

            res.status(201).json({
                success: true,
                code: 201,
                message: "Created new borrow history successfully",
                data: response
            });

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    updateStatus: async(req, res, next) => {
        try {

            const response = await Category.update({
                'statusPinjam': req.body.statusPinjam
            }, {
                where: {
                    idHistori: req.params.idHistori
                }
            });

            res.status(200).json({
                success: true,
                code: 200,
                message: "Updated borrow status successfully",
                data: response
            });

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    updateApproval: async(req, res, next) => {
        try {
            const response = await Category.update({
                'isApproved': true
            }, {
                where: {
                    idHistori: req.params.idHistori
                }
            });

            res.status(200).json({
                success: true,
                code: 200,
                message: "Updated borrow approval successfully",
                data: response
            });

        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    removeId: async(req, res, next) => {
        try {
            await BorrowingHistory.destroy({
                where: {
                    idHistori: req.params.idHistori
                }
            });
            res.status(204).json({
                success: true,
                code: 204,
                message: "Deleted borrow history successfully",
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
}
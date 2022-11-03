const db = require('../../utils/db.setup.util')
const { borrowingHistory } = db.models

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await borrowingHistory.findAll();
            res.status(200).json({
                success: true,
                code: 200,
                message: "Get borrow histories successfully",
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

    getId: async(req, res, next) => {
        try {
            const response = await borrowingHistory.findOne({
                where: {
                    idHistori: req.params.id
                }
            });
            res.status(200).json({
                success: true,
                code: 200,
                message: `Get borrow history with id ${req.params.id} successfully`,
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

    insert: async(req, res, next) => {
        try {
            const response = await borrowingHistory.create({
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
            return res.status(500).json({
                success: false,
                code: 500,
                message: error.message
            })
        }
    },

    updateStatus: async(req, res, next) => {
        try {

            const response = await borrowingHistory.update({
                'statusPinjam': req.body.statusPinjam
            }, {
                where: {
                    idHistori: req.params.id
                }
            });

            if (response == 0)
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "Borrow history not found"
                })

            const getData = await borrowingHistory.findOne({
                where: {
                    idHistori: idHistori
                }
            });

            res.status(200).json({
                success: true,
                code: 200,
                message: "Updated borrow status successfully",
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

    updateApproval: async(req, res, next) => {
        try {
            const idHistori = req.params.id;
            const response = await borrowingHistory.update({
                'isApproved': true
            }, {
                where: {
                    idHistori: idHistori
                }
            });

            if (response == 0)
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "Borrow history not found"
                })

            const getData = await borrowingHistory.findOne({
                where: {
                    idHistori: idHistori
                }
            });

            res.status(200).json({
                success: true,
                code: 200,
                message: "Updated borrow approval successfully",
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
        try {
            await borrowingHistory.destroy({
                where: {
                    idHistori: req.params.id
                }
            });
            res.status(204).json({
                success: true,
                code: 204,
                message: "Deleted borrow history successfully",
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
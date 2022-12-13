const { NotFoundError, ForbiddenRresourceError } = require('../../errors/utils/errors.interface.util');
const db = require('../../utils/db.setup.util')
const { borrowingHistory } = db.models

module.exports = {
    get: async(req, res, next) => {
        try {
            let response;
            if (res.locals.admin == true) {
                response = await borrowingHistory.findAll();
            } else if (res.locals.userInfo.nim == borrowingHistory.nim) {
                response = await borrowingHistory.findAll({
                    where: {
                        nim: res.locals.userInfo.nim
                    }
                });
            }
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get borrow histories successfully",
                data: response
            });
        } catch (error) {
            next(error)
        }
    },

    getId: async(req, res, next) => {
        try {
            let response;
            const idHistori = req.params.id;
            if (res.locals.admin == true) {
                response = await borrowingHistory.findOne({
                    where: {
                        idHistori: idHistori
                    }
                });
            } else if (res.locals.userInfo.nim == borrowingHistory.nim) {
                response = await borrowingHistory.findOne({
                    where: {
                        idHistori: idHistori,
                        nim: res.locals.userInfo.nim
                    }
                });
            }
            return res.status(200).json({
                success: true,
                code: 200,
                message: `Get borrow history with id ${idHistori} successfully`,
                data: response
            });
        } catch (error) {
            next(error)
        }
    },

    insert: async(req, res, next) => {
        try {
            const getBorrowUser = await borrowingHistory.findAll({
                where: {
                    idBuku: req.body.idBuku,
                    nim: req.body.nim
                }
            });

            if (getBorrowUser.length != 0) {
                getBorrowUser.forEach(borrow => {
                    if (borrow.statusPinjam == 'Menunggu Approval' || borrow.statusPinjam == 'Sedang Dipinjam') {
                        return res.status(400).json({
                            success: false,
                            code: 400,
                            message: "Failed request! Please waiting for approval or finish the previous borrow"
                        });
                    }
                });
            }

            const response = await borrowingHistory.create({
                idBuku: req.body.idBuku,
                nim: req.body.nim,
                statusPinjam: "Menunggu Approval",
                isApproved: false
            });

            return res.status(201).json({
                success: true,
                code: 201,
                message: "Created new borrow history successfully",
                data: response
            });

        } catch (error) {
            next(error)
        }
    },

    updateStatus: async(req, res, next) => {
        try {
            if (res.locals.admin == false)
                throw new ForbiddenRresourceError('Forbidden Resource.')

            const idHistori = req.params.id;
            const response = await borrowingHistory.update({
                statusPinjam: req.body.statusPinjam
            }, {
                where: {
                    idHistori: idHistori
                }
            });

            if (response == 0)
                throw new NotFoundError("Borrow History Not Found")

            const getData = await borrowingHistory.findOne({
                where: {
                    idHistori: idHistori
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated borrow status successfully",
                data: getData
            });

        } catch (error) {
            next(error)
        }
    },

    updateApproval: async(req, res, next) => {
        try {
            if (res.locals.admin == false)
                throw new ForbiddenRresourceError('Forbidden Resource.')

            const idHistori = req.params.id;
            let response;
            if (req.body.isApproved == false)
                response = await borrowingHistory.update({
                    isApproved: req.body.isApproved,
                    statusPinjam: "Peminjaman Ditolak"
                }, {
                    where: {
                        idHistori: idHistori
                    }
                });

            else
                response = await borrowingHistory.update({
                    isApproved: req.body.isApproved,
                    statusPinjam: "Sedang Dipinjam"
                }, {
                    where: {
                        idHistori: idHistori
                    }
                });

            if (response == 0)
                throw new NotFoundError("Borrow History Not Found")

            const getData = await borrowingHistory.findOne({
                where: {
                    idHistori: idHistori
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated borrow approval successfully",
                data: getData
            });

        } catch (error) {
            next(error)
        }
    },

    removeId: async(req, res, next) => {
        try {
            const response = await borrowingHistory.destroy({
                where: {
                    idHistori: req.params.id
                }
            });

            if (response == 0)
                throw new NotFoundError("Borrow History Not Found")

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted borrow history successfully",
            });

        } catch (error) {
            next(error)
        }
    },
}
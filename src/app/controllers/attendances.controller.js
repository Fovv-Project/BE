const db = require('../../utils/db.setup.util')
const { ForbiddenResourceError, UnauthorizedError } = require('../../errors/utils/errors.interface.util')
const { attendance } = db.models
const { genCode } = require('../../utils/authenticator.util')

module.exports = {
    get: async(req, res, next) => {
        try {

            const userNim = res.locals.userInfo.nim
            if (res.locals.userInfo.admin == false)
                throw new ForbiddenResourceError('Forbidden Resource.')
            else
                return res.status(200).json({
                    success: true,
                    code: 200,
                    message: `Get attendances record for user with NIM:${userNim} successfully`,
                    data: await attendance.findAll({
                        where: {
                            nim: userNim
                        }
                    })
                });

        } catch (err) {
            next(err)
        }
    },

    getId: async(req, res, next) => {

        try {

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get attendances record successfully",
                data: await attendance.findOne({
                    where: {
                        idAbsensi: req.params.id
                    }
                })
            });

        } catch (err) {
            next(err)
        }

    },

    insert: async(req, res, next) => {

        try {

            const sentToken = req.body.token

            const curMin = Math.round(Date.now() / 60000)
            const curToken = genCode(curMin.toString())

            const lastMin = curMin - 1
            const lastMinToken = genCode(lastMin.toString())

            if (sentToken !== curToken && sentToken !== lastMinToken)
                throw new Error("Invalid Token")

            const userNim = res.locals.userInfo.nim
            return res.status(200).json({
                success: true,
                code: 200,
                message: `Successfully inserted attendance`,
                data: await attendance.create({
                    nim: userNim
                })
            })

        } catch (err) {
            next(err)
        }
    },
}
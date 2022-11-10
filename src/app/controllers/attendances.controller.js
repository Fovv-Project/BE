const db = require('../../utils/db.setup.util')
const { ForbiddenResourceError, UnauthorizedError } = require('../../errors/utils/errors.interface.util')
const { attendance } = db.models

module.exports = {
    get: async (req, res, next) => {
        try {

            if (res.locals.userInfo.admin == false)
                throw new ForbiddenResourceError("Forbidden resource")
                
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get attendances record successfully",
                data: await attendance.findAll()
            });

        } catch (err) {
            next(err)
        }
    },

    getId: async (req, res, next) => {
        
        try {

            const userNim = res.locals.userInfo.nim
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get attendances record successfully",
                data: await attendance.findOne({
                    where: {
                        nim: userNim
                    }
                })
            });
            
        } catch (err) {
            next(err)
        }

    },

    insert: async (req, res, next) => {

    },
}
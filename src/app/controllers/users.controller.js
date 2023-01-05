const db = require('../../utils/db.setup.util')
const { user } = db.models
const { ForbiddenRresourceError } = require('../../errors/utils/errors.interface.util')

module.exports = {
    get: async(req, res, next) => {

        try {

            if (res.locals.userInfo.admin == false)
                throw new ForbiddenRresourceError('Forbidden Resource.')

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get user record successfully",
                data: await user.findAll()
            });

        } catch (err) {
            next(err)

        }

    },

    getNim: async(req, res, next) => {

        try {
            const userName = res.locals.userInfo.name
            const userNim = res.locals.userInfo.nim
            const reqNim = req.params.nim

            if (reqNim !== userNim)
                throw new ForbiddenRresourceError('Forbidden Resource.')

            const [userRecord, isInserted] = await user.findOrCreate({
                where: { nim: userNim },
                defaults: {
                    nim: userNim,
                    nama: userName
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: isInserted ? `Successfully inserted new user record of NIM : [ ${userNim} ] with username : [ ${userName} ]` : `Successfully get user record with NIM : [ ${userNim} ]`,
                data: userRecord
            })

        } catch (err) {
            next(err)

        }

    },
}
const db = require('../../utils/db.setup.util')
const { user } = db.models

module.exports = {
    get: async (req, res, next) => {

        try {

            if (res.locals.admin == false)
                throw new Error('403')

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get user record successfully",
                data: await user.findAll()
            });

        } catch (err) {

            if(err.message === "403")
                return res.status(403).json({
                    success: false,
                    code: 403,
                    message: "Forbidden resource"
                })

            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal server error"
            })

        }

    },

    getNim: async (req, res, next) => {

        const userName = res.locals.userInfo.name
        const userNim = res.locals.userInfo.nim

        let userRecord, isInserted

        try {

            [userRecord, isInserted] = await user.findOrCreate({
                where: { nim: userNim },
                defaults: {
                    nim: userNim,
                    nama: userName
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: isInserted ? `Successfully inserted new user record of NIM : [ ${userNim} ] with username : [ ${userName} ]`
                    : `Successfully get user record with NIM : [ ${reqNim} ]`,
                data: userRecords
            })

        } catch (err) {

            return res.status(500).json({
                success: false,
                code: 500,
                message: err.message
            })

        }

    },
}
const { genToken } = require('../../utils/authenticator.util')
const { ForbiddenResourceError } = require('../../errors/utils/errors.interface.util')

module.exports = {

    get: async(req, res, next) => {

        try {

            if (res.locals.admin == false)
                throw new ForbiddenResourceError("Unauthorized access")

            const cur_min = Math.round(Date.now() / 60000)
            const token = genToken(cur_min.toString())


            return res.status(200).json({
                success: true,
                code: 200,
                message: `Successfully generated token`,
                data: token
            })

        } catch (err) {

            next(err)

        }

    }

}
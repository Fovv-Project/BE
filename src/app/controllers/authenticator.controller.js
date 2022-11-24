const { genCode } = require('../../utils/authenticator.util')

module.exports = {

    get: async(req, res, next) => {

        try{

            if (res.locals.userInfo.admin == false)
                throw new ForbiddenResourceError("Unauthorized access")

            const cur_min = Math.round(Date.now() / 60000)
            const hashed_min = genCode(cur_min.toString())

            return res.status(200).json({
                success: true,
                code: 200,
                message: `Successfully generated token`,
                data: hashed_min
            })

        }catch(err){

            next(err)

        }
        
    }

}
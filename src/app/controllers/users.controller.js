import User from "../models/users.model.js";

module.exports = {
    get: async(req, res, next) => {

        if(res.locals.admin == false)
            res.status(403).json({        
                success : false,        
                code : 403,        
                message : "Forbidden resource"
            })
        
        try {

            const response = await User.findAll();
            res.status(200).json({
                success: true,
                code: 200,
                message: "Get user record successfully",
                data: response
            });

        } catch (error) {

            return res.status(500).json({
                success : false,        
                code : 500,        
                message : "Internal server error"
            })

        }

    },
    getNim: async(req, res, next) => {
        try {
            const response = await User.findOne({
                where: {
                    nim: req.params.nim
                }
            });
            res.status(200).json({
                success: true,
                code: 200,
                message: `Get user with nim ${req.params.nim} successfully`,
                data: response
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
}
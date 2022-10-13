import User from "../models/users.model.js";

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await User.findAll();
            res.status(200).json({
                success: true,
                code: 200,
                message: "Get User record successfully",
                data: response
            });
        } catch (error) {
            return res.status(500).send(error.message);

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
                message: `Get User with nim ${req.params.nim} successfully`,
                data: response
            });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    },
}
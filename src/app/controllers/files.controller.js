const uploadFile = require("../middlewares/upload.middleware");
const fs = require('fs').promises;
const { ForbiddenResourceError, NotFoundError } = require('../../errors/utils/errors.interface.util')
const { ClientError } = require('../../errors/classes/super/client.error')
require('dotenv').config()

module.exports = {
    upload: async(req, res, next) => {
        try {
            if (res.locals.admin == false)
                throw new ForbiddenResourceError('Forbidden Resource.')

            await uploadFile(req, res);
            if (req.file == undefined) {
                throw new NotFoundError("No file is received")
            }
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Uploaded the file successfully",
                data: {
                    fileName: req.file.originalname
                }
            });
        } catch (err) {
            next(err)
        }
    },

    getListFiles: async(req, res, next) => {
        const directoryPath = "./src/storage/upload/";
        try {
            if (res.locals.admin == false)
                throw new ForbiddenResourceError('Forbidden Resource.')

            const files = await fs.readdir(directoryPath)

            let fileInfos = [];

            files.forEach((file) => {
                fileInfos.push({
                    fileName: file,
                });
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get Files successfully",
                data: fileInfos
            });

        } catch (err) {
            next(err)
        }

    },

    download: async(req, res, next) => {
        try {
            const fileName = req.params.name;
            const directoryPath = "./src/storage/upload/";

            res.download(directoryPath + fileName, fileName, (err) => {
                if (err) {
                    throw new ClientError('Couldnt download the file ' + err)
                }
            });

        } catch (err) {
            next(err)
        }
    }
}
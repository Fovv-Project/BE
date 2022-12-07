const uploadFile = require("../middlewares/upload.middleware");
const fs = require('fs').promises;
const { ForbiddenResourceError, NotFoundError } = require('../../errors/utils/errors.interface.util')

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
                    url: "http://localhost:3001/file/files/" + req.file.originalname
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
                    url: "http://localhost:3001/file/files/" + file,
                });
            });

            // console.log(fileInfos)
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
                    res.status(500).send({
                        message: "Could not download the file. " + err,
                    });
                }
            });

        } catch (err) {
            next(err)
        }
    }
}
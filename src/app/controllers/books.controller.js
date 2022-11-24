const db = require('../../utils/db.setup.util')
const { book } = db.models

module.exports = {
    get: async(req, res, next) => {
        try {
            const response = await book.findAll();
            return res.status(200).json({
                success: true,
                code: 200,
                message: "Get all books successfully",
                data: response
            });
        } catch (error) {
            next(error)

        }
    },

    getId: async(req, res, next) => {
        try {
            const response = await book.findOne({
                where: {
                    idBuku: req.params.id
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: `Get book with id ${req.params.id} successfully`,
                data: response
            });

        } catch (error) {
            next(error)
        }
    },

    insert: async(req, res, next) => {

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

        file.mv(`./public/images/${fileName}`, async(err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
                await Product.create({ name: name, image: fileName, url: url });
                res.status(201).json({ msg: "Product Created Successfuly" });
            } catch (error) {
                console.log(error.message);
            }
        })
        try {
            const response = await book.create({
                idBuku: req.body.idBuku,
                idKategori: req.body.idKategori,
                judulBuku: req.body.judulBuku,
                pengarang: req.body.pengarang,
                penerbit: req.body.penerbit,
                tahunTerbit: req.body.tahunTerbit,
                jumlahHalaman: req.body.jumlahHalaman,
                deskripsi: req.body.deskripsi,
                file: req.files.file
            });

            return res.status(201).json({
                success: true,
                code: 201,
                message: "Create new book successfully",
                data: response
            });

        } catch (error) {
            next(error)
        }
    },

    updateId: async(req, res, next) => {
        try {
            const idBuku = req.params.id
            const response = await book.update({
                judulBuku: req.body.judulBuku,
                pengarang: req.body.pengarang,
                penerbit: req.body.penerbit,
                tahunTerbit: req.body.tahunTerbit,
                jumlahHalaman: req.body.jumlahHalaman,
                deskripsi: req.body.deskripsi
            }, {
                where: {
                    idBuku: idBuku
                }
            });

            if (response == 0)
                return res.status(404).json({
                    success: false,
                    code: 404,
                    message: "Book not found"
                })

            const getData = await book.findOne({
                where: {
                    idBuku: idBuku
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Updated book successfully",
                data: getData
            });

        } catch (error) {
            next(error)
        }
    },

    remove: async(req, res, next) => {
        try {
            await book.destroy({
                where: {
                    idBuku: req.params.id
                }
            });

            return res.status(200).json({
                success: true,
                code: 200,
                message: "Deleted book successfully",
            });

        } catch (error) {
            next(error)
        }
    },
}
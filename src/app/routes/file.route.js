const express = require("express");
const router = express.Router();
const fileController = require("../controllers/file.controller");
/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.post("/upload", fileController.upload);
router.get("/files", fileController.getListFiles);
router.get("/files/:name", fileController.download);



module.exports = router
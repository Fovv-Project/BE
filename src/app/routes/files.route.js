const express = require("express");
const router = express.Router();
const fileController = require("../controllers/files.controller");

/* Middleware */
router.use(require('../middlewares/logger.middleware'))

/* Routes */
router.get("/", [
    require('../middlewares/auth.middleware')
], fileController.getListFiles);
router.post("/upload", [
    require('../middlewares/auth.middleware')
], fileController.upload);
router.get("/download/:name", fileController.download);

module.exports = router
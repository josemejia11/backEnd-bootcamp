const express = require("express");
const router = express.Router();
const videoRoutes = require("./video.route");

router.use("/video", videoRoutes);

module.exports = router;

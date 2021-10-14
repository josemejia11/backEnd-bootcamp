const express = require("express");
const router = express.Router();
const Video = require("../models/video");
const Joi = require("joi");
const environment = require("../config");
const fileFilter = require("../helpers/file-filter");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, environment.uploadFilesFolder);
  },
  filename: fileFilter.filename,
});
const upload = multer({
  storage,
  fileFilter: fileFilter.videoFilter,
});

/**
 * Gets all videos store in the database 
 * and filters the videos in case the search option is used
 */
router.get("/", async (req, res) => {
  try {
    const name = req.query.search;
    const params = name ? { name: { $regex: name, $options: "i" } } : {};
    const videos = await Video.find(params);
    res.status(200).send(videos);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Get a specific video based on the id generated when inserted on mongodb
 */
router.get("/detail/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const video = await Video.findById(_id);
    res.status(201).send(video);
  } catch (error) {
    res.status(404).send();
  }
});

/**
 * get a specific video to dowload based on the id generated when inserted on mongodb
 */
router.get("/download/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const video = await Video.findOne({ _id });
    if (!video) {
      return res.status(404).send();
    }
    const file = `${environment.publicFolder}${video.video}`;
    res.status(201).download(file);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * inserts a new video on the database 
 * name: string
 * description: string
 * video: string that contains the video route
 */
router.post("/create", upload.single("file"), async (req, res) => {
    let { body } = req;
    const video = req.file ? `/uploads/${req.file.filename}` : undefined;
    body = { ...body, video };

    const schema = Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      video: Joi.string().required(),
    });
    const { value, error } = await schema.validate(body);
    if (error) {
      return res.status(400).json({
        message: "Proccess failed",
        error: error,
      });
    }

    try {
      const newVideo = new Video(value);
      await newVideo.save();
      return res.status(201).send();
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error) => {
    res.status(400).send({
      error: error.message,
    });
  }
);

module.exports = router;

const nanoid = require("nanoid");
const mime = require("mime-types");

const mimeTypeWhitList = [
  "application/x-mpegurl",
  "video/3gpp",
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
  "video/ms-asf",
  "video/x-ms-wmv",
  "video/x-msvideo",
];

const videoFilter = function (req, file, cb) {
  // Accept videos only
  if (!mimeTypeWhitList.includes(file.mimetype)) {
    return cb(new Error("File type is not allowed"), false);
  }
  cb(null, true);
};
exports.videoFilter = videoFilter;

const filename = function (req, file, cb) {
  /* generates a "unique" name - not collision proof but unique enough for small sized applications */
  let id = nanoid.nanoid();
  /* need to use the file's mimetype because the file name may not have an extension at all */
  let ext = mime.extension(file.mimetype);
  cb(null, `${id}.${ext}`);
};
exports.filename = filename;

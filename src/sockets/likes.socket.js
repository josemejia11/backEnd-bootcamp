const Video = require("../models/video");

module.exports = function (io, socket) {
  socket.on("like", async (options) => {
    const userId = socket.handshake.query.token;
    if ( !userId || !options || !["likes", "dislikes"].includes(options.type) || !options.id) {
      return;
    }

    try {
      const video = await Video.findById(options.id);

      video.likes = video.likes.filter((id) => id != userId);
      video.dislikes = video.dislikes.filter((id) => id != userId);
      video[options.type].push(userId);

      await video.save();
      io.emit(`like_response_${options.id}`, {
        success: true,
        likes: video.likes.length,
        dislikes: video.dislikes.length,
      });
    } catch (error) {
      socket.emit(`like_response_${options.id}`, { success: false });
    }
  });
};

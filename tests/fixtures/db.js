const mongoose = require('mongoose');
const Video = require('../../src/models/video');

const videoOne = {
    _id: mongoose.Types.ObjectId(),
    name: 'Video in test 1',
    description: 'this is a video in testing database 1',
    video: "/uploads/b21yGC2KDMnaW0yrdRjHX.mp4",
    likes: [
        "QnlAOgJKK35DQRZPWjLdq",
        "NxW50tYFHjc64oMTpzXjx"
    ],
    dislikes: [],
}

const videoTwo = {
    _id: mongoose.Types.ObjectId(),
    name: 'Video in test 2',
    description: 'this is a video in testing database 2',
    video: "/uploads/b21yGC2KDMnaW0yrdRjHX.mp4",
    likes: [
        "QnlAOgJKK35DQRZPWjLdq",
        "NxW50tYFHjc64oMTpzXjx"
    ],
    dislikes: [
        "9PJUwt9ZnxGhesrLRV0aF"
    ],
}

const videoThree = {
    _id: mongoose.Types.ObjectId(),
    name: 'Video in test 3',
    description: 'this is a video in testing database 3',
    video: "/uploads/b21yGC2KDMnaW0yrdRjHX.mp4",
    likes: [],
    dislikes: [
        "QnlAOgJKK35DQRZPWjLdq",
        "NxW50tYFHjc64oMTpzXjx"
    ],
}

const setupDataBase = async () => {
    await Video.deleteMany();
    await new Video(videoOne).save();
    await new Video(videoTwo).save();
    await new Video(videoThree).save();
}

module.exports = {
    videoOne,
    videoTwo,
    videoThree,
    setupDataBase
}
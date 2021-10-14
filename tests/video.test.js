const request = require('supertest');
const {server, app} = require('../src/index');
const Video = require('../src/models/video');
const { videoOne, videoTwo, videoThree, setupDataBase } = require('./fixtures/db');

beforeEach(setupDataBase);

test('Should get all videos in the database', async () => {
    const response = await request(app)
        .get('/video/')
        .send()
        .expect(200);

    // expect(response.body.length).toBe(2);
});

test('Should get a single video by id in the database', async () => {
    const response = await request(app)
        .get('/video/detail/6164f3ce30dae20e679fe26c')
        .send()
        .expect(201);
    expect(response.body.length).not.toBeNull();
    expect(response.body.likes).not.toBeNull();
});

// test('Should add a new video to the database', async () => {
//     const response = await request(app)
//         .post('/video/create')
//         .send({
//             name: 'Video in testFile',
//             description: 'this is a video in testFile',
//             video: "b21yGC2KDMnaW0yrdRjHX.mp4",
//         })
//         .send()
//         .expect(201);
// });

// test('Should get a single video by id in the database and download it', async () => {
//     const response = await request(app)
//         .get('/video/download/6164f3ce30dae20e679fe26c')
//         .send()
//         .expect(201);

//     expect(response.body.length).not.toBeNull();
// });
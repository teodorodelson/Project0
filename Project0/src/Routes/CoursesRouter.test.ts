import { app } from '../index';
import request from 'supertest';

describe("Testing for /get", () => {
    it("GET request to /getCoursesByDescription/:desc", async () => {
        const res = await request(app)
            .get('/getCoursesByDescription')
        expect(res.status).toEqual(404);
    });
}),
    it("POST request to /addcourse", async () => {
        const res = await request(app)
            .post('/addcourse')
        expect(res.status).toEqual(403);
    }),


    it("GET request to /getallCourses", async () => {
        const res = await request(app)
            .get('/getallCourses')
        expect(res.status).toEqual(200);
    }),



    it("GET request to /getCourses/:id", async () => {
        const res = await request(app)
            .get('/getCourses/:2')
        expect(res.status).toEqual(200);
    });



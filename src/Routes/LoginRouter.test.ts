import {app} from '../index';
import request from'supertest';

describe("Testing for /login",()=>{
    it("POST request to /login", async()=>{
        const res = await request(app)
        .post('/login')
        expect(res.status).toEqual(200);
    });
}),
    it("GET request to /logout", async()=>{
        const res = await request(app)
        .get('/logout')
        expect(res.status).toEqual(200);
    });


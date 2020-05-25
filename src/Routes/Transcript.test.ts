import {app} from '../index';
import request from'supertest';


describe("Testing for /studDashboard",()=>{
    it("GET request to /studDashboard", async()=>{
        const res = await request(app)
        .get('/studDashboard')
        expect(res.status).toEqual(403);
    });
    }),
    it("PATCH request to /changeContact", async()=>{
        const res = await request(app)
        .patch('/changeContact')
        expect(res.status).toEqual(403);
    }),
    it("GET request to /records", async()=>{
        const res = await request(app)
        .get('/records')
        expect(res.status).toEqual(403);
    });



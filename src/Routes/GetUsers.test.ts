import {app} from '../index';
import request from'supertest';



// here is a test suite for the paper router. it makes srue that the appropriate routes return the correct status codes
// technically, these are integration test
// these tests are also not very robust. Note how we would have to add a couple of more tests for each of these
// situations (perhaps some where the user does properly input data)to be confident that the endpoint is fully functional
describe("Testing for /getallAccounts",()=>{
    it("GET request to /getallAccounts", async()=>{
        const res = await request(app)
        .get('/getallAccounts')
        expect(res.status).toEqual(403);
    });
}),
    it("GET request to /getAccountById/:id", async()=>{
        const res = await request(app)
        .get('/getAccountById/:1')
        expect(res.status).toEqual(403);
}),
   it("GET request to /", async()=>{
        const res = await request(app)
        .get('/')
        expect(res.status).toEqual(200);
    }),
    it("GET request to /getAccountByEmail/:id", async()=>{
        const res = await request(app)
        .get('/getAccountByEmail/:id@gmail.com')
        expect(res.status).toEqual(403);
    }),
    it("Post request to /register", async()=>{
        const res = await request(app)
        .post('/register')
        expect(res.status).toEqual(403);
    });



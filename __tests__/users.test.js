const request = require('supertest');
const app = require('../app');

describe("Users GET endpoints", () => {

    test("GET /users returns 200", async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        
    });

    test('GET /users returns JSON', async () => {
        const response = await request(app).get('/users');
        expect(response.type).toMatch(/json/);
    });

    test('GET /users returns an array', async () => {
        const response = await request(app).get('/users');
        expect(Array.isArray(response.body)).toBe(true);
    });

    

    test('GET /users/:id returns JSON & 200', async () => {
        const all = await request(app).get('/users');
        expect(all.body.length).toBeGreaterThan(0);
        const id = all.body[0]._id;

        const res = await request(app).get(`/users/${id}`);

        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
        expect(res.body._id).toBe(id);
    });
});


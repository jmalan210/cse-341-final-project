const request = require('supertest');
const app = require('../app');

describe("Users GET endpoints", () => {

    test("GET /books returns 200", async () => {
        const response = await request(app).get('/books');
        expect(response.status).toBe(200);
        
    });

    test('GET /books returns JSON', async () => {
        const response = await request(app).get('/books');
        expect(response.type).toMatch(/json/);
    });

    test('GET /books returns an array', async () => {
        const response = await request(app).get('/books');
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /books/:id returns JSON & 200', async () => {
        const all = await request(app).get('/books');
        expect(all.body.length).toBeGreaterThan(0);
        const id = all.body[0]._id;

        const res = await request(app).get(`/books/${id}`);

        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
        expect(res.body._id).toBe(id);
    });
});
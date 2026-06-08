const request = require('supertest');
const app = require('../app');

describe("Meetings GET endpoints", () => {

    test("GET /meetings returns 200", async () => {
        const response = await request(app).get('/meetings');
        expect(response.status).toBe(200);
        
    });

    test('GET /meetings returns JSON', async () => {
        const response = await request(app).get('/meetings');
        expect(response.type).toMatch(/json/);
    });

    test('GET /meetings returns an array', async () => {
        const response = await request(app).get('/meetings');
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /meetings/:id returns JSON & 200', async () => {
        const all = await request(app).get('/meetings');
        expect(all.body.length).toBeGreaterThan(0);
        const id = all.body[0]._id;

        const res = await request(app).get(`/meetings/${id}`);

        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
        expect(res.body._id).toBe(id);
    });

    test('GET /meetings/month/:year/:month returns filtered meetings', async () => {
        const year = 2026;
        const month = 7;

        const res = await request(app).get(`/meetings/month/${year}/${month}`);

        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
        expect(Array.isArray(res.body)).toBe(true);

        res.body.forEach(meeting => {
            const date = new Date(meeting.date);

            expect(date.getFullYear()).toBe(year);
            expect(date.getMonth() + 1).toBe(month);
        })
    })
});
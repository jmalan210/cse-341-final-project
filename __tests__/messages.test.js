const request = require('supertest');
const app = require('../app');

describe("messages GET endpoints", () => {

    test("GET /messages returns 200", async () => {
        const response = await request(app).get('/messages');
        expect(response.status).toBe(200);
        
    });

    test('GET /messages returns JSON', async () => {
        const response = await request(app).get('/messages');
        expect(response.type).toMatch(/json/);
    });

    test('GET /users returns an array', async () => {
        const response = await request(app).get('/messages');
        expect(Array.isArray(response.body)).toBe(true);
    });

    

    test('GET /messages/:id returns JSON & 200', async () => {
        const all = await request(app).get('/messages');
        expect(all.body.length).toBeGreaterThan(0);
        const id = all.body[0]._id;

        const res = await request(app).get(`/messages/${id}`);

        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
        expect(res.body._id).toBe(id);
    });

    test('GET /messages/displayName/:displayName returns filtered messages', async () => {
        const displayName = 'BookWorm417'

        const res = await request(app).get(`/messages/displayName/${displayName}`);
        // console.log(res.body);

        expect(res.status).toBe(200);
        expect(res.type).toMatch(/json/);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

        res.body.forEach(message => {
            expect(message.user).toBeDefined();
            expect(message.user.displayName).toBe(displayName)
        })
    })
});
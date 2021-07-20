import * as dotenv from 'dotenv';

import app from '../app';

import * as request from 'supertest';

beforeAll(() => {
  dotenv.config();
});

describe('server', () => {
  it('get ok status', async () => {
    const response = await request(app)
      .get('/test')
      .send({
        orderId: null
      });

    // Unauthorized
    expect(response.status).toBe(200);
  });
});

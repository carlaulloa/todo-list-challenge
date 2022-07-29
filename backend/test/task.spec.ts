import request from 'supertest';
import app from '../src/app';
import { DatabaseBootstrap } from '../src/bootstrap/database.bootstrap';
import { SeedBootstrap } from '../src/bootstrap/seed.bootstrap';

const databaseBootstrap = new DatabaseBootstrap();
const seedBootstrap = new SeedBootstrap();

let taskStates: any[];

describe('Task', () => {
  beforeAll(async () => {
    await databaseBootstrap.initialize();
  });

  afterAll(async () => {
    const connection = databaseBootstrap.getConnection();
    connection.close();
  });

  beforeEach(async() => {
    taskStates = await seedBootstrap.initializeTaskStates();
    await seedBootstrap.initializeTasks()
  })

  test('Ok, Insert', async() => {
    const response = await request(app)
      .post('/v1/tasks')
      .send({
        description: 'Tarea 1',
        state: {
          id: taskStates[0]._id
        },
        startDate: new Date()
      });
      const { body } = response;

    expect(response.statusCode).toBe(201);
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
    expect(body).toHaveProperty('isDeleted', false);
    expect(body).toHaveProperty('state.name');
  })

  test('Fail, Insert when range date is invalid', async() => {
    const response = await request(app)
      .post('/v1/tasks')
      .send({
        description: 'Tarea 1',
        state: {
          id: taskStates[0]._id
        },
        startDate: new Date(2022, 7, 31),
        endDate: new Date(2022, 7, 30) 
      });
      
    expect(response.statusCode).toBe(400);
  })

  test('Fail. Get paginated without pagination params', async() => {
    const response = await request(app)
      .get('/v1/tasks/paging');
    expect(response.statusCode).toBe(400);
  })

  test('Ok. Get paginated', async() => {
    const response = await request(app)
      .get('/v1/tasks/paging')
      .query('page=1')
      .query('size=10');
    const { body } = response;

    expect(response.statusCode).toBe(200);
    expect(body.pageNum).toBe(1);
    expect(body.pageSize).toBe(10);
    expect(body.totalPages).toBe(0);
    expect(body.totalResults).toBe(0);
    expect(body).toHaveProperty('items');
  })

})
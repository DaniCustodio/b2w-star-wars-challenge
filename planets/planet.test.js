const request = require('supertest')
const app = require('../app')
const db = require('../_helpers/db').db;

async function removeAllCollections () {
  const collections = Object.keys(db.collections)
  for (const collectionName of collections) {
    const collection = db.collections[collectionName]
    await collection.deleteMany()
  }
}

describe('/planets', () => {
  afterEach(async () => {
    removeAllCollections()
	})

  it('should add a planet to the database', async () => {

    const PLANET = {
      name: 'Terra',
      terrain: 'diverso',
      climate: 'diverso',
    }

    const response = await request(app)
				.post("/")
        .send(PLANET)

    expect(response.status).toBe(200)
    expect(response.body.refCode).toBe(1)
  })

  it('should NOT add a planet when there is a required field missing', async () => {
    const PLANET = {
      name: 'Terra',
      terrain: 'diverso',
    }

    const response = await request(app)
				.post("/")
        .send(PLANET)

    expect(response.status).toBe(400)
    expect(response.body.refCode).toBe(98)
  })

  it('should NOT add a planet when a unique field already exists', async () => {
    const PLANET = {
      name: 'Terra',
      terrain: 'diverso',
      climate: 'diverso',
    }

    await request(app)
				.post("/")
        .send(PLANET)

    const response = await request(app)
				.post("/")
        .send(PLANET)

    expect(response.status).toBe(400)
    expect(response.body.refCode).toBe(96)
  })
})

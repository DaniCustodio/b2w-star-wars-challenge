const request = require("supertest");
const app = require("../app");
const db = require("../_helpers/db").db;

async function removeAllCollections() {
  const collections = Object.keys(db.collections);
  for (const collectionName of collections) {
    const collection = db.collections[collectionName];
    await collection.deleteMany();
  }
}

const PLANET = {
  name: "Naboo",
  terrain: "grassy hills, swamps, forests, mountains",
  climate: "temperate",
};

const PLANET2 = {
  name: "Dagobah",
  terrain: "swamp, jungles",
  climate: "murky",
};

describe("/planets", () => {
  afterEach(async () => {
    removeAllCollections();
  });

  describe("/add", () => {
    it("should add a planet to the database", async () => {
      const response = await request(app).post("/").send(PLANET);

      expect(response.status).toBe(200);
      expect(response.body.refCode).toBe(1);
    });

    it("should NOT add a planet when there is a required field missing", async () => {
      const PLANET = {
        name: "Terra",
        terrain: "diverso",
      };

      const response = await request(app).post("/").send(PLANET);

      expect(response.status).toBe(400);
      expect(response.body.refCode).toBe(98);
    });

    it("should NOT add a planet when a unique field already exists", async () => {
      const PLANET = {
        name: "Terra",
        terrain: "diverso",
        climate: "diverso",
      };

      await request(app).post("/").send(PLANET);

      const response = await request(app).post("/").send(PLANET);

      expect(response.status).toBe(400);
      expect(response.body.refCode).toBe(96);
    });
  });

  describe("/getAll", () => {
    it("should return 2 entries ", async () => {
      await request(app).post("/").send(PLANET);

      await request(app).post("/").send(PLANET2);

      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body.refCode).toBe(1);
      expect(response.body.data.length).toBe(2);
    });

    it("should return 0 entries ", async () => {
      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body.refCode).toBe(1);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe("/search", () => {

    it("should return a planet given its name", async () => {

      await request(app).post("/").send(PLANET);

      const response = await request(app).get(`/name/${PLANET.name}`);

      expect(response.status).toBe(200);
      expect(response.body.refCode).toBe(1);
      expect(response.body.data).toMatchObject(PLANET)
    })

    it("should return an error when the planet does not exist, given its name", async () => {
      const response = await request(app).get(`/name/${PLANET.name}`);

      expect(response.status).toBe(400);
      expect(response.body.refCode).toBe(97);
      expect(response.body.message).toBe("this planet doesn't exist");
    })
    

    it("should return a planet given its id", async () => {
      await request(app).post("/").send(PLANET);

      const response = await request(app).get("/1");

      expect(response.status).toBe(200);
      expect(response.body.refCode).toBe(1);
      expect(response.body.data).toMatchObject(PLANET)
    })

    it("should return an error when the planet does not exist, given its id", async () => {
      const response = await request(app).get(`/1`);

      expect(response.status).toBe(400);
      expect(response.body.refCode).toBe(97);
      expect(response.body.message).toBe("this planet doesn't exist");
    })
  });

  describe("/delete", () => {
    it("should delete a entry", async () => {
      await request(app).post("/").send(PLANET);

      const response = await request(app)
        .delete("/delete")
        .send({ name: PLANET.name });

      const entries = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body.refCode).toBe(1);
      expect(entries.body.data.length).toBe(0);
    });

    it("should return a error when the planet doesn't exist", async () => {
      const response = await request(app).delete("/delete").send(PLANET.name);

      expect(response.status).toBe(400);
      expect(response.body.refCode).toBe(97);
      expect(response.body.message).toBe("this planet doesn't exist");
    });
  });
});

const request = require("supertest");
const { app, server } = require("../server");
const { insertData, updateWithPutData, updateWithPatchData } = require("../seeds/package");
const mongoose = require("mongoose");
const PackageModel = require("../models/Package");
const uuid = require('uuid')

jest.useFakeTimers();

describe("Post Package", () => {

  const id = uuid.v4()

  it("Should reset database", async (done) => {
    const del = await PackageModel.deleteMany({});

    expect(del.ok).toEqual(1);
    done()
  });

  it("Should create a new package", async (done) => {
    const data = insertData
    data._id = id
    const res = await request(app).post("/package").send(data);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("package");
    done()
  });

  it("Should update a whole document", async (done) => {
    const res = await request(app).put(`/package/${id}`).send(updateWithPutData)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("message", "Updated successfully")
    done()
  })

  it("Should update several data in document", async (done) => {
    const res = await request(app).patch(`/package/${id}`).send(updateWithPatchData)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("message", "Updated successfully")
    done()
  })

  it("Should delete a data by id", async (done) => {
    const res = await request(app).delete(`/package/${id}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("message", "Deleted successfully")
    done()
  })

  afterAll(async () => {
    mongoose.disconnect()
    server.close()
  });
});

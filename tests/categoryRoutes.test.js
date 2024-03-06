//import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../src/app";

describe("POST /api/categories", () => {
  it("should create a new category and return it", async () => {
    const newCategory = {
      name: "Sociology",
    };

    const response = await request(app)
      .post("/api/categories")
      .send(newCategory)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toEqual(newCategory.name);
  });
});

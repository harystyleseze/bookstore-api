//import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../src/app";

describe("POST /api/authors", () => {
  it("should create a new author and return it", async () => {
    const newAuthor = {
      name: "Newman Joy",
    };

    const response = await request(app)
      .post("/api/authors")
      .send(newAuthor)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.name).toEqual(newAuthor.name);
  });
});

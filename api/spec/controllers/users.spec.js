const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
let token;
let user1;


describe("/users", () => {
  beforeEach( async () => {
    await User.deleteMany({});
  });

  describe("POST, when email and password are provided", () => {
    test("the response code is 201", async () => {
      let response = await request(app)
        .post("/users")
        .send({username: "User1", email: "poppy@email.com", password: "1234"})
      expect(response.statusCode).toBe(201)
    })

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({username: "User1", email: "scarlett@email.com", password: "1234"})
      let users = await User.find()
      let newUser = users[users.length - 1]
      expect(newUser.email).toEqual("scarlett@email.com")
    })

    test("created user is signed in and token is provided", async () => {
      let response = await request(app)
      .post("/users")
      .send({username: "User1", email: "scarlett@email.com", password: "1234"})
    expect(response.body.token).not.toEqual(undefined)
    })
  })

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({username: "User1", email: "skye@email.com"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({username: "User1", email: "skye@email.com"})
        let users = await User.find()
        expect(users.length).toEqual(0)
    });
  })
  
  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({username: "User1", password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({username: "User1", password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })

  describe("POST, when username is missing", () => {
    test("response code is 400", async () => {
      let response = await request(app)
        .post("/users")
        .send({email: "skye@email.com", password: "1234"})
      expect(response.statusCode).toBe(400)
    });

    test("does not create a user", async () => {
      await request(app)
        .post("/users")
        .send({email: "skye@email.com", password: "1234"})
      let users = await User.find()
      expect(users.length).toEqual(0)
    });
  })
})

  describe("users/@me", () => {
    beforeEach( async () => {
      await User.deleteMany({});
      user1 = new User ({
          email: "test@test.com",
          password: "test",
          username: "myusername",
          trips: ["mock1", "mock2"]
      });
      await user1.save();
      token = JWT.sign(
          {
          user_id: user1.id,
          iat: Math.floor(Date.now() / 1000) - 5 * 60,
          exp: Math.floor(Date.now() / 1000) + 10 * 60,
          },
          secret
      )
    });
    test("the response code is 201 and trips and username are returned when called with a valid token", async () => {
        let response = await request(app)
          .get("/users")
          .set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toBe(201)
        expect(response.body.username).toBe("myusername");
        expect(response.body.trips).toEqual(["mock1", "mock2"]);
    })

    test("the response code is 500 when called with an invalid token", async () => {
      let response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${"horse"}`)
      expect(response.statusCode).toBe(401);
  })
  test("the response code is 401 is returned for a user that does not exist", async () => {
    await User.deleteMany({});
    let response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`)
    expect(response.statusCode).toBe(400);
})
});

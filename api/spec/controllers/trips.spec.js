const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require('../../models/user')
const TripsController = require('../../controllers/trips')
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

let token;
let user;

describe("/trips", () => {
    beforeEach( async () => {
        await User.deleteMany({});
        user = new User ({
            email: "test@test.com",
            password: "test",
            username: "password",
        });
        await user.save();
        token = JWT.sign(
            {
            user_id: user.id,
            iat: Math.floor(Date.now() / 1000) - 5 * 60,
            exp: Math.floor(Date.now() / 1000) + 10 * 60,
            },
            secret
        )
    });
    describe("Add. when valid token and valid parameters are passed in", () => {
        test("the response code is 201 and valid trip object is added to the trips array and token comes back", async () => {
            let response = await request(app)
            .post("/trips")
            .set("authorization", `Bearer ${token}`)
            .send({tripName: "Trip1", startLocation: "Stop 1", endLocation: "Stop 2", attractions: ["1", "2", "3"], token: token})
            let users = await User.find();
            expect(response.statusCode).toBe(201);
            expect(users.length).toEqual(1);
            expect(users[0].trips.length).toEqual(1);
            expect(users[0].trips[0].tripName).toBe("Trip1");
            expect(users[0].trips[0].startLocation).toBe("Stop 1");
            expect(users[0].trips[0].endLocation).toBe("Stop 2");
            expect(users[0].trips[0].attractions).toEqual(["1", "2", "3"]);
            expect(response.body.token);
        });
    });
    describe("Add. when token is invalid and valid parameters are passed in", () => {
        test("the response code is 401 and no valid trip object is added to the trips array", async () => {
            let response = await request(app)
            .post("/trips")
            .send({tripName: "Trip1", startLocation: "Stop 1", endLocation: "Stop 2", attractions: ["1", "2", "3"], token: token})
            let users = await User.find();
            expect(response.statusCode).toBe(401);
            expect(users.length).toEqual(1);
            expect(users[0].trips.length).toEqual(0);
        })
    })
    describe("Add. when valid token and invalid parameters are passed in", () => {
        test("the response code is 400 and valid trip object is no added to the trips array", async () => {
            let response = await request(app)
            .post("/trips")
            .set("authorization", `Bearer ${token}`)
            .send({test: "Trip1", hello: "Stop 1", fail: "Stop 2", fail1: ["1", "2", "3"], token: token})
            let users = await User.find();
            expect(response.statusCode).toBe(500);
            expect(users.length).toEqual(1);
            expect(users[0].trips.length).toEqual(0);
        });
    });
})
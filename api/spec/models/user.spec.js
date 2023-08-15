const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      username: "username1",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      username: "username1",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });
  
  it("has a username", () => {
    const user = new User({
      username: "username1",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.username).toEqual("username1");
  });

  it("has an empty trip array", () => {
    const user = new User({
      username: "username1",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.trips.length).toEqual(0);
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      username: "username1",
      email: "someone@example.com",
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          username: "username1",
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });

});

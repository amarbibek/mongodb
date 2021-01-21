const { doesNotMatch } = require("assert");
const assert = require("assert");

const User = require("../src/user");

describe("Reading users from DB", () => {
    let joe;
    
    beforeEach((done) => {
        joe = new User({ name: "Joe" });
        
        joe.save()
            .then(() => {
                done();
            });
    });

    it("finds all the users with a name of joe", (done) => {

        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString())
                done();
            });

    });

    it("find a user with specific id", (done) => {
        User.findOne({ _id: joe._id })
            .then((user) => {
                assert(user.name === "Joe");
                done();
        })
    })
});
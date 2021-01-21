
const assert = require("assert");

const User = require("../src/user");

describe("Deleting a user", () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: "Joe" });
        joe.save()
            .then(() => {
                done();
            });
    });

    it("model instance remove", (done) => {
        joe.remove()
            .then(() => {
                return User.findOne({ name: "Joe" });
                // done();
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    it("class method remove", (done) => {
        
        User.remove({ name: "Joe" })
            .then(() => {
                return User.findOne({ name: "Joe" });
                // done();
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    
    });
    it("class method findAndRemove", (done) => {
        User.findOneAndRemove({ name: "Joe" })
        .then(() => {
                return User.findOne({ name: "Joe" });
                // done();
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });
    it("class method findByIdAndRemove", (done) => {
        User.findByIdAndRemove({ _id: joe._id })
        .then(() => {
                return User.findOne({ name: "Joe" });
                // done();
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });

});
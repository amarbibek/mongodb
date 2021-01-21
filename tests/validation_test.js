const assert = require("assert");

const User = require("../src/user");

describe("Validating records", () => {

    it("requires a username", (done) => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name is required.");
        done();
    });

    it("requires a username longer than 2 chars", (done) => {
        const user = new User({ name: "A" });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === "Name must be longer than 2 chars.");
        done();
    });
    
    it("disallows invalid records being saved", (done) => {
        const user = new User({ name: "Al" });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === "Name must be longer than 2 chars.");
                done();
            });
    });
});
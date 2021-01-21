
const assert = require("assert");

const User = require("../src/user");

describe("update a user", () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: "Joe" , likes:20});
        joe.save()
            .then(() => {
                done();
            });
    });

    it("instance type using set and save", (done) => {

        joe.set({ name: 'Alex' }); 
        // console.log("123");
        // done();
        joe.save()
            .then(() => {
                return User.find({})
            })
            .then((users) => {
                // console.log(users);
                assert(users.length === 1);
                assert(users[0].name === "Alex");
                done();
            });
        
    });
    it("model instance can update", (done) => {

        joe.update({ name: 'Alex' }) 
            .then(() => {
                return User.find({})
            })
            .then((users) => { 
                assert(users.length === 1);
                assert(users[0].name === "Alex");
                done();
            });
        
    });

    it("a model class can update", (done) => {
        User.updateMany({ name: 'Joe' }, { name: 'Alex' }) 
            .then(() => { 

               return User.find({}) 
            } )
            .then((users) => {
                // console.log(users);
                assert(users.length === 1);
                assert(users[0].name === "Alex");
                done();
            });
    });
    it("a model class can update one record", (done) => {
        User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }) 
            .then(() => {
                return User.find({})
            })
            .then((users) => { 
                assert(users.length === 1);
                assert(users[0].name === "Alex");
                done();
            });
    });
    it("a model class can find a record with an Id and update", (done) => {
        User.findByIdAndUpdate(joe._id, { name: 'Alex' }) 
            .then(() => {
                return User.find({})
            })
            .then((users) => { 
                assert(users.length === 1);
                assert(users[0].name === "Alex");
                done();
            });
    });
    it("a user can have their postCount incremented by by 1", (done) => {
        User.updateMany({name:'Joe'}, { $inc :{ likes: 1 }}) 
            .then(() => {
                return User.findOne({name:'Joe'})
            })
            .then((users) => { 
                assert(users.likes === 21); 
                done();
            });
    });
});
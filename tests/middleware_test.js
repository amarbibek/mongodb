const mongoose = require("mongoose");
const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe("Middleware", () => {

    let joe,blogPost;
    beforeEach((done) => {
        joe = new User({ name: "Joe" });
        blogPost = new BlogPost({
            title: "JS is great.",
            content: "Yeah, it is really great."
        }); 

        joe.blogPosts.push(blogPost); 

        Promise.all([joe.save(), blogPost.save() ])
            .then(() => done());
 
    });

    it("users cleanup dangling blogposts on remove", (done) => {
        joe.remove()
            .then(() => {
                return BlogPost.count();                
            })
            .then((count) => {
            assert(count === 0);
                done();
            });
    });

});
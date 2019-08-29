import should from 'should';
import postsModel from '../postsModel';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

describe('postModelTests', () => {

    let post = {};
    //create a post with random user id before each test
    beforeEach(() => {
        const id = mongoose.Types.ObjectId().toString(); //generates pseudo random ObjectID 
        post = {
            user: id,
            title: "A title"
        };
    })

    it('should validate a post with a user and title', (done) => {
        const m = new postsModel(post);
        m.validate((err) => {
            should.not.exist(err);
            m.title.should.equal(post.title);
            m.user.toString().should.equal(post.user);
            done();
        });
    });

});   
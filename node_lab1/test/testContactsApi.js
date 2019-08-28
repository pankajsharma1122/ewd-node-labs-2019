import supertest from 'supertest';
import {app} from '../index.js';
import should from 'should';

// UNIT test begin
describe('Contacts API test', function () {
    this.timeout(120000);
    // test #1: return a collection of json documents
    it('should return collection of JSON documents', function (done) {
        supertest(app)
            .get('/api/contacts')
            .expect('Content-type', /json/)
            .expect(200) // This is the HTTP response
            .then(res => {
                // HTTP status should be 200
                res.should.have.property('status').equal(200);
                done();
            });
    });
});
var request = require('superagent');
var assert = require('assert');

describe('loading express', function () {
  var server = require('../api');
  var baseUrl = 'http://localhost:3000/api/v1';
  var existingId = 'b63ba480-f937-4ac2-8f16-46ce738a5231';

  before(function () {
    server = require('../api');
  });

  after(function () {
    server.stop();
    process.exit();
  });

  it('responds to /api/v1', function testSlash(done) {
  request
    .get(baseUrl)
    .end((err, res) => {
      assert.equal(res.status, 200);
      done();
    });
    
  });

  it('responds to GET Events', function testSlash(done) {
    request
      .get(baseUrl + '/events')
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });

  it('responds to GET Event by Existing id', function testSlash(done) {
    request
      .get(baseUrl + '/events/')
      .end((err, res) => {
        var existingItem = res.body[0];
        request
          .get(baseUrl + '/events/' + existingItem.id)
          .end((err, res) => {
            assert.equal(res.status, 200);
            done();
          });
      });
  });

  it('responds 404 to GET Event by unexisting id', function testSlash(done) {
    request
      .get(baseUrl + '/events/foo')
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });

  it('404 everything else', function testPath(done) {
    request
      .get(baseUrl + '/foo/bar')
      .end((err, res) => {
        assert.equal(res.status, 404);
        done();
      });
  });
  
});
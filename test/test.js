var express = require('express');
var request = require('supertest');
var should = require("should");
var app = express();

var server = request.agent("http://localhost:3000");
app.get('/trans', function(req, res) {
  res.send('ok');
});


var value = { "from":"en","to":"en","text":"Hello"};

describe('testing node translator', function() {
    it('should return code 200', function(done) {
        request(app)
        .get('/trans')
        .expect(200)
        .end(function(err, res){
        if(err) {
            done(err);
        } else {
            res.status.should.equal(200);
            done();
        }
        });
    });

    it("should return data",function(done){
        server
        .get("/translate?from=en&to=fr&text=Hello%20my%20name%20is%20Ilyess")
        .expect(200)
        .end(function(err,res){
            should.exist(res);
            should.not.exist(err);
            res.should.be.json;
            done();
        });
    });

    it("should return 404",function(done){
        request(app)
        .get("/test")
        .expect(404)
        .end(function(err,res){
            if(err) {
                done(err);
            } else {
                res.status.should.equal(404);
                done();
            }
        });
    });
});

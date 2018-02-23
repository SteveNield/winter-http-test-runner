var request = require('supertest');

var server;

const config = {
  host: 'www.lvh.me'
}

module.exports.setup = function(args){
  server = require(args.server);
}

module.exports.teardown = function(){
  server.close();
}

module.exports.testGetResponse = function(uri, response, done){
  try{
    request(server)
      .get(uri)
      .set('host', config.host)
      .expect(response, done);
  } catch(err){
    done(err);
  }
}

module.exports.assertGetResponse = function(uri, assertion, done){
  try{
    request(server)
      .get(uri)
      .set('host', config.host)
      .end(function(err, res){
        if(err){
          done(err);
        }
        assertion(err, res);
        done();
      })
  } catch(err){
    done(err);
  }
}

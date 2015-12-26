var frisby = require('frisby');
var testUser = require('../../testUser');

frisby.create('Create when user does not exists.')
  .post('http://localhost:3000/create', testUser, { json: true })
  .expectStatus(201)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({success: true})
.toss();


frisby.create('Create user when user exists')
  .post('http://localhost:3000/create', testUser, { json: true })
  .expectStatus(202)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({success: false})
.toss();

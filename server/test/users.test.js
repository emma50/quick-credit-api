import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import userInfo from './userInfo';

chai.use(chaiHttp);
chai.should();

let request;

/**
 * signup endpoint test
 */
describe('Test signup endpoints', () => {
  before(() => {
    request = chai.request(server).keepOpen();
  });
  it('Should signup a user', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signup);
    res.status.should.be.equal(201);
    res.body.data.firstname.should.be.equal('John');
    res.body.data.lastname.should.be.equal('Wick');
    res.body.data.email.should.be.equal('emmanuel@yahoo.com');
  });
  it('Should fail if email is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.signupEmailOmitted);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" is not allowed to be empty');
  });
  it('Should fail if email is invalid', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.invalidEmail);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"email" must be a valid email');
  });
  it('Should fail if firstName is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedFirstname);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"firstName" is not allowed to be empty');
  });
  it('Should fail if lastName is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedLastname);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"lastName" is not allowed to be empty');
  });
  it('Should fail if password is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedPassword);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"password" is not allowed to be empty');
  });
  it('Should fail if address is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signup/')
      .send(userInfo.omittedAddress);
    res.status.should.be.equal(400);
    res.body.error.should.have.eql('"address" is not allowed to be empty');
  });
  it('Should signin a user', async () => {
    const res = await request
      .post('/api/v1/auth/signin')
      .send(userInfo.user);
    res.status.should.be.equal(200);
    res.body.should.be.a('object');
    res.body.data.should.have.property('token');
  });
  it('should fail if email is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.password);
    res.should.have.status(400);
  });
  it('should fail if password is omitted', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.email);
    res.should.have.status(400);
  });
  it('should fail if Email is invalid', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.email);
    res.should.have.status(400);
  });
  it('should fail if Password is invalid', async () => {
    const res = await request
      .post('/api/v1/auth/signin/')
      .send(userInfo.invalidpassword);
    res.should.have.status(400);
    res.body.should.be.a('object');
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userInfo from './userInfo';

chai.use(chaiHttp);
chai.should();

let adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTE2MjM5MDIyfQ.Ofr0EvUpjuXe5AzLEmqD3fEcPuobySGofIW4rcWocSI';
let userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxNjIzOTAyMn0.SkypLPaygHuCYyTpbU9Xrek9XEtFNhcJjFmEzGsK3uE';
describe('Test adminUser endpoint', () => {
  before((done) => {
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.user)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        userToken = res.body.data.token;
      });
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(userInfo.adminUser)
      .end((err, res) => {
        res.status.should.be.equal(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('token');
        adminToken = res.body.data.token;
        done();
      });
  });
  it('Should allow admin to get all users', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('Should not allow user not an admin to get all users', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .set('x-auth-token', userToken)
      .send()
      .end((err, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });
  it('Should allow admin to get no user if no user is present', (done) => {
    chai.request(server)
      .get('/api/v1/users')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

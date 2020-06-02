import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import userInfo from './userInfo';

chai.use(chaiHttp);
chai.should();

describe('Test adminUser endpoint', () => {
  let adminToken;
  before((done) => {
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
      .get('/api/v1/users/')
      .set('x-auth-token', adminToken)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

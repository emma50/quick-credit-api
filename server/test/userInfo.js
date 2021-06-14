const userInfo = {
  signup: {
    email: 'emmanuel@yahoo.com',
    mobileNo: '08141300333',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    address: '39, Victoria street, Ojota',
  },
  user: {
    email: 'user1@quickcredit.com',
    password: 'emma@2020',
  },
  user2: {
    email: 'emmanuel@yahoo.com',
    password: 'emma@2020',
  },
  repaidUser: {
    email: 'user1@quickcredit.com',
    password: 'emma@2020',
  },
  adminUser: {
    email: 'admin@quickcredit.com',
    password: 'emma@2020',
  },
  signupEmailOmitted: {
    email: '',
    mobileNo: '08141300333',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    address: '39, Victoria street, Ojota',
  },
  invalidEmail: {
    email: 'emmanuel:yahoo.com',
    mobileNo: '08141300333',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    address: '39, Victoria street, Ojota',
  },
  omittedFirstName: {
    email: 'emmanuel@yahoo.com',
    mobileNo: '08141200333',
    firstName: '',
    lastName: 'Wick',
    password: 'emma@2019',
    address: '39, Victoria street, Ojota',
  },
  omittedLastName: {
    email: 'emmanuel@yahoo.com',
    mobileNo: '08141300333',
    firstName: 'John',
    lastName: '',
    password: 'emma@2020',
    address: '39, Victoria street, Ojota',
  },
  omittedPassword: {
    email: 'emmanuel@yahoo.com',
    mobileNo: '08141300333',
    firstName: 'John',
    lastName: 'Wick',
    password: '',
    address: '39, Victoria street, Ojota',
  },
  omittedAddress: {
    email: 'emmanuel@yahoo.com',
    mobileNo: '08141300333',
    firstName: 'John',
    lastName: 'Wick',
    password: 'emma@2020',
    address: '',
  },
  password: {
    password: 'emma@2020',
  },
  email: {
    email: 'emmanuel@yahoo.com',
  },
  invalidUser: {
    email: 'emmanuelyahoo.com',
    password: 'emma@2020',
  },
  invalidPassword: {
    email: 'emmanuel@yahoo.com',
    password: 'd',
  },
};

export default userInfo;

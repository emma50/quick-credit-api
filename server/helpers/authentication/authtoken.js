import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authtoken = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  // generateToken(id, isadmin, email, firstname, lastname)
  generateToken(id, isadmin) {
    const token = jwt.sign({ userid: id, admin: isadmin }, process.env.JWTPRIVATEKEY);
    // return token;
    // const token = jwt.sign({
    //   userid: id, admin: isadmin, uemail: email, fname: firstname, lname: lastname,
    // }, process.env.JWTPRIVATEKEY);
    return token;
  },
};
export default authtoken;

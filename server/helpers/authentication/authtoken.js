import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authtoken = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id, isadmin, email, firstname, lastname) {
    const token = jwt.sign({
      userid: id, admin: isadmin, uemail: email, fname: firstname, lname: lastname,
    }, process.env.JWTPRIVATEKEY);
    return token;
  },
};
export default authtoken;

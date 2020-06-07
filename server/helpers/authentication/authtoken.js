import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authtoken = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(id, isAdmin) {
    const token = jwt.sign({ userid: id, admin: isAdmin }, process.env.JWTPRIVATEKEY);
    return token;
  },
};
export default authtoken;

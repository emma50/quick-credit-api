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

  generateToken(id, isAdmin, email, firstName, lastName) {
    const token = jwt.sign({
      userId: id, admin: isAdmin, uEmail: email, fName: firstName, lName: lastName,
    }, process.env.JWT_PRIVATE_KEY);
    return token;
  },
};

export default authtoken;

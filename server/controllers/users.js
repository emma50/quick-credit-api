import dotenv from 'dotenv';
import userModel from '../models/userModel';
import authtok from '../helpers/authentication/authtoken';
import userObjects from '../middleware/userObjects';
import db from '../db/index';

dotenv.config();

/**
 *
 *
 * @class userController
 */
class userController {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof userController
   */
  static async userSignup(req, res) {
    const hash = authtok.hashPassword(req.body.password);
    const values = userObjects.newUser(hash, req);
    try {
      const { rows } = await db.query(userModel.createUser, values);
      const {
        id, isadmin, firstname, lastname, email,
      } = rows[0];
      // const userToken = authtok.generateToken(id, isadmin, email, firstname, lastname);
      const userToken = authtok.generateToken(id, isadmin);
      res.status(201).json({
        status: 201,
        message: `Hi, ${firstname} You have successfully registered`,
        data: {
          token: userToken,
          id,
          firstname,
          lastname,
          email,
        },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof userController
   */
  static async userSignin(req, res) {
    const user = userObjects.getUser(req);
    if (!user) return res.status(401).json({ message: 'Your email or password is incorrect' });
    const validPassword = authtok.comparePassword(user.password, req.body.password);
    if (!validPassword) return res.status(401).json({ status: 401, message: 'Your email or password is incorrect' });
    const {
      id, firstName, lastName, email, mobileno, isAdmin,
    } = user;
    const userToken = authtok.generateToken(id, isAdmin);
    return res.status(200).json({
      status: 200,
      data: {
        token: userToken,
        id,
        firstName,
        lastName,
        mobileno,
        email,
      },
    });
  }
}

export default userController;

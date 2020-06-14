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
    try {
      const { rows } = await db.query(userModel.currentUser, [req.body.email]);
      const result = rows[0];
      if (!result) { res.status(401).json({ status: 401, message: 'Your email is incorrect' }); }
      const validPassword = authtok.comparePassword(result.password, req.body.password);
      if (!validPassword) { res.status(401).json({ status: 401, message: 'Your password is incorrect' }); }
      const {
        id, firstname, lastname, mobileno, email, isadmin,
      } = result;
      // const userToken = authtok.generateToken(id, isadmin, email, firstname, lastname);
      const userToken = authtok.generateToken(id, isadmin);
      return res.status(200).json({
        status: 200,
        message: `Hi, ${firstname} You have successfully logged in`,
        data: {
          token: userToken,
          id,
          firstname,
          lastname,
          email,
          mobileno,
        },
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default userController;

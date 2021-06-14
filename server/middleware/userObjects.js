import db from '../db/index';
import userModel from '../models/userModel';

export default class userObjects {
  static async currentUser(req, res, next) {
    try {
      const user = await db.query(userModel.currentUser, [req.body.email]);
      if (user.rows.length) return res.status(409).json({ status: 409, message: 'The user with this email already exist' });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static newUser(hash, req) {
    const values = [
      req.body.email,
      req.body.mobileNo,
      req.body.firstName,
      req.body.lastName,
      hash,
      req.body.address,
    ];
    return values;
  }
}

import db from '../db/index';
import userModel from '../models/userModel';

/**
 *
 *
 * @class adminUserController
 */
class adminUserController {
  static async adminVerifyUser(req, res) {
    try {
      const { rows } = await db.query(userModel.currentUser, [req.params.useremail]);
      const user = rows[0];
      if (!user) { res.status(404).json({ status: 404, message: `User with the email: ${req.params.useremail} is Not Found` }); }
      const values = [req.body.status || user.status, user.id];
      const result = await db.query(userModel.updateStatus, values);
      const {
        email, firstname, lastname, address, status,
      } = result.rows[0];
      return res.status(200).json({
        status: 200,
        message: `You have successfully verified ${firstname} ${lastname}`,
        data: {
          email,
          firstname,
          lastname,
          address,
          status,
        },
      });
    } catch (error) { return res.status(500).json(error); }
  }

  static async adminViewUsers(req, res) {
    const users = await db.query(userModel.getAllUsers);
    if (users.length === 0) return res.status(404).json({ status: 404, message: 'No User Available' });
    return res.status(200).json({ status: 200, data: users });
  }
}

export default adminUserController;

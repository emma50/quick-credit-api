import User from '../models/user';
import userObjects from '../middleware/userObjects';

class adminUserController {
  static async adminVerifyUser(req, res) {
    const user = await userObjects.singleUser(req);
    userObjects.verifyUser(user, req);
    const {
      email, firstName, lastName, password, address, status,
    } = user;
    return res.status(200).json({
      status: 200,
      data: {
        email,
        firstName,
        lastName,
        password,
        address,
        status,
      },
    });
  }

  static async adminViewUsers(req, res) {
    const users = await User.fetchAll();
    if (users && users.length === 0) return res.status(404).json({ message: 'No User Available' });
    return res.status(200).json({ status: 200, data: users });
  }
}

export default adminUserController;

import User from '../models/user';
import currentUser from '../helpers/currentUser';
import validateUserStatus from '../helpers/validation/status';

class adminUserController {
  static async adminVerifyUser(req, res) {
    const user = await currentUser(req.params.useremail);
    if (!user) return res.status(404).json({ message: 'The user with the given email was not found' });
    const { error } = validateUserStatus(req.body);
    if (error) return res.status(400).json(error.message);
    Object.assign(user, { status: req.body.status });
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

import User from '../models/user';

const users = User.fetchAll();
const currentUser = (email) => users.find((e) => e.email === email);

export default currentUser;

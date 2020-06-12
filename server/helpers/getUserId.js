import User from '../models/user';

const users = User.fetchAll();
const getUserId = (userId) => users.find((user) => user.id === userId);

export default getUserId;

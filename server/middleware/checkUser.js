import getUserById from '../helpers/getUserId';
import getSpecificLoan from '../helpers/specificLoan';

const checkUser = async (req, res, next) => {
  const userId = req.user.id;
  const { email } = getUserById(userId);
  const loan = await getSpecificLoan(Number(req.params.loanid));
  if (!loan) return res.status(401).json({ status: 400, error: 'No Loan Avalable' });
  if (email !== loan.user) return res.status(401).json({ status: 401, error: 'Access Denied' });
  return next();
};

export default checkUser;

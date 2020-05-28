import getSpecificLoan from '../helpers/specificLoan';

const checkLoan = async (req, res, next) => {
  const loan = await getSpecificLoan(Number(req.params.loanid));
  if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
  console.log(loan.user);
  return next();
};

export default checkLoan;

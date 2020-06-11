import Loan from '../models/loan';

const loans = Loan.fetchAll();
const currentLoan = (email) => loans.find((loan) => loan.user === email);

export default currentLoan;

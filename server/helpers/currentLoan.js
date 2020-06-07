import Loan from '../models/loan';

const loans = Loan.fetchAll();
const currentLoan = (email) => loans.find((l) => l.user === email);

export default currentLoan;

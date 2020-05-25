import Loan from '../models/loan';

const loans = Loan.fetchAll();
const getSpecificLoan = (loanId) => loans.find((loan) => loan.id === loanId);

export default getSpecificLoan;

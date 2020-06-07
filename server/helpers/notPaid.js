import Loan from '../models/loan';

const loans = Loan.fetchAll();
const notPaid = (s, r) => loans.filter((loan) => (loan.status === s && loan.repaid === r));

export default notPaid;

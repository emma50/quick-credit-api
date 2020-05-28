import Repayment from '../models/repayment';

const repayments = Repayment.fetchAll();
const repaymentHistory = (loanId) => repayments.filter((repayment) => repayment.loanId === loanId);
export default repaymentHistory;

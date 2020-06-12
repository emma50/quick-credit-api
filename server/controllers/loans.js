import Loan from '../models/loan';
import Repayment from '../models/repayment';
import getSpecificLoan from '../helpers/specificLoan';
import notPaid from '../helpers/notPaid';
import repaymentHistory from '../helpers/repaymentHistory';
import currentLoan from '../middleware/currentLoan';
import userObjects from '../middleware/userObjects';
import loanObjects from '../middleware/loanObjects';

class loansController {
  static async createLoan(req, res) {
    const user = await userObjects.getUsersId(req);
    let loan = currentLoan(user.email);
    if (loan && loan.status === 'pending') return res.status(400).json({ status: 400, message: `You have a ${loan.status} loan with us` });
    if (loan && loan.status === 'approved' && loan.repaid === false) return res.status(400).json({ status: 400, message: 'Your loan is yet to be repaid' });
    loan = loanObjects.newLoan(req);
    const { firstName, lastName, email } = user;
    return res.status(201).json({
      status: 201,
      data: {
        id: loan.id,
        firstName,
        lastName,
        user: email,
        tenor: loan.tenor,
        amount: loan.amount,
        paymentInstallment: loan.paymentInstallment,
        status: loan.status,
        balance: loan.balance,
        interest: loan.interest,
      },
    });
  }

  static async loanRepayments(req, res) {
    const loan = await getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
    if (loan && loan.status === 'pending') return res.status(400).json({ message: `The User loan status is still ${loan.status}` });
    if (Number(req.body.paidAmount) > Number(loan.balance)) return res.status(400).json({ message: `The amount entered is Higher than the users balance of ${loan.balance}` });
    const newBalance = parseFloat(loan.balance - req.body.paidAmount).toFixed(2);
    await Object.assign(loan, { balance: newBalance });
    if (newBalance === '0.00') { await Object.assign(loan, { repaid: true }); }
    const repayment = new Repayment(
      loan.id,
      parseFloat(req.body.paidAmount).toFixed(2),
      loan.paymentInstallment,
    );
    await repayment.save();
    const {
      amount, paymentInstallment, balance,
    } = loan;
    const {
      id, loanId, paidAmount, createdOn,
    } = repayment;
    return res.status(201).json({
      status: 201,
      data: {
        id,
        loanId,
        createdOn,
        amount,
        monthlyInstallment: paymentInstallment,
        paidAmount,
        balance,
      },
    });
  }

  static async specificLoans(req, res) {
    const loan = await getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'The loan application with the given ID was not found' });
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  static async allLoans(req, res) {
    const loans = await Loan.fetchAll();
    if (loans && loans.length === 0) return res.status(400).json({ message: 'No Loan Application Available' });
    const { status } = req.query;
    const { repaid } = req.query;
    if ((status !== undefined) && (repaid !== undefined)) {
      const result = await notPaid(status, JSON.parse(repaid));
      return res.status(200).json({ status: 200, data: result });
    }
    return res.status(200).json({ status: 200, data: loans });
  }

  static async adminApproveLoans(req, res) {
    const loan = await getSpecificLoan(Number(req.params.loanid));
    if (!loan) return res.status(404).json({ message: 'No Loan Application Available' });
    Object.assign(loan, { status: req.body.status });
    const {
      id, amount, tenor, status, paymentInstallment, interest,
    } = loan;
    if (status === 'rejected') {
      return res.status(200).json({
        status: 200,
        data: {
          loanId: id,
          loanAmount: amount,
          tenor,
          status,
        },
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        loanId: id,
        loanAmount: amount,
        tenor,
        status,
        monthlyInstallment: paymentInstallment,
        interest,
      },
    });
  }

  static async viewAllRepayments(req, res) {
    const repayments = await repaymentHistory(Number(req.params.loanid));
    if (!repayments) return res.status(400).json({ message: 'No Repayment History Found' });
    return res.status(200).json({ status: 200, data: repayments });
  }
}

export default loansController;

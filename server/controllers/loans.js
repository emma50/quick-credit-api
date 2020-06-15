import Loan from '../models/loan';
import Repayment from '../models/repayment';
import getSpecificLoan from '../helpers/specificLoan';
import notPaid from '../helpers/notPaid';
import repaymentHistory from '../helpers/repaymentHistory';
import loanObjects from '../middleware/loanObjects';
import db from '../db/index';
import loanModel from '../models/loanModel';

class loansController {
  static async createLoan(req, res) {
    if (req.user.isadmin === true) return res.status(401).json({ status: 401, message: 'You cannot apply for Loan as an Admin' });
    try {
      const { rows } = await db.query(loanModel.getLoanByEmail, [req.user.email]);
      const index = rows.length - 1;
      const loan = rows[index];
      if (loan && loan.status === 'pending') return res.status(409).json({ status: 409, message: `You have a ${loan.status} loan with us` });
      if (loan && loan.status === 'approved' && loan.repaid === false) return res.status(409).json({ status: 409, message: 'Your loan is yet to be repaid' });
      const data = await loanObjects.newLoan(req);
      return res.status(201).json({
        message: `Thank you ${data.firstname} you have successfully applied for a loan.`,
        status: 201,
        data,
      });
    } catch (error) { return res.status(500).json(error); }
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

import express from 'express';

import loanController from '../controllers/loans';
import auth from '../helpers/authentication/auth';
import checkUser from '../middleware/checkUser';
import isAdminCheck from '../middleware/isAdmin';
import allCustomValidator from '../middleware/allCustomValidator';
import validateLoan from '../helpers/validation/loans';
import validateLoanStatus from '../helpers/validation/loanStatus';
import validatePaidAmount from '../helpers/validation/paidAmount';

const router = express.Router();

const { verifyToken } = auth;
const {
  allLoans,
  specificLoans,
  viewAllRepayments,
  loanRepayments,
  createLoan,
  adminApproveLoans,
} = loanController;

// @route Get api/v1/loans
// @desc Test post route
// @access Public

router.get('', verifyToken, isAdminCheck, allLoans);

router.get('/:loanid', verifyToken, isAdminCheck, specificLoans);

router.get('/:loanid/repayments', verifyToken, checkUser, viewAllRepayments);

router.post('/:loanid/repayment', verifyToken, isAdminCheck, allCustomValidator(validatePaidAmount), loanRepayments);

router.post('', verifyToken, allCustomValidator(validateLoan), createLoan);

router.patch('/:loanid', verifyToken, isAdminCheck, allCustomValidator(validateLoanStatus), adminApproveLoans);

export default router;

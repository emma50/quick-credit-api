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

// @route Get api/v1/loans
// @desc Test post route
// @access Public

router.get('', auth.verifyToken, isAdminCheck, loanController.allLoans);

router.get('/:loanid', auth.verifyToken, isAdminCheck, loanController.specificLoans);

router.get('/:loanid/repayments', auth.verifyToken, checkUser, loanController.viewAllRepayments);

router.post('/:loanid/repayment', auth.verifyToken, isAdminCheck, allCustomValidator(validatePaidAmount), loanController.loanRepayments);

router.post('', auth.verifyToken, allCustomValidator(validateLoan), loanController.createLoan);

router.patch('/:loanid', auth.verifyToken, isAdminCheck, allCustomValidator(validateLoanStatus), loanController.adminApproveLoans);

export default router;

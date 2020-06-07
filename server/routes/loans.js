import express from 'express';

import loanController from '../controllers/loans';
import auth from '../helpers/authentication/auth';
import checkUser from '../middleware/checkUser';
import isAdminCheck from '../middleware/isAdmin';

const router = express.Router();

// @route Get api/v1/loans
// @desc Test post route
// @access Public

router.get('', auth.verifyToken, isAdminCheck, loanController.allLoans);

router.get('/:loanid', auth.verifyToken, isAdminCheck, loanController.specificLoans);

router.get('/:loanid/repayments', auth.verifyToken, checkUser, loanController.viewAllRepayments);

router.post('/:loanid/repayment', auth.verifyToken, isAdminCheck, loanController.loanRepayments);

router.post('', auth.verifyToken, loanController.createLoan);

router.patch('/:loanid', auth.verifyToken, isAdminCheck, loanController.adminApproveLoans);

export default router;

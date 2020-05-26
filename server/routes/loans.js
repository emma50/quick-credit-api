import express from 'express';

import loanController from '../controllers/loans';
import auth from '../helpers/authentication/auth';

const router = express.Router();

// @route Get api/v1/loans
// @desc Test post route
// @access Public

router.get('', loanController.allLoans);

router.get('/:loanid', loanController.specificLoans);

router.post('', auth.verifyToken, loanController.createLoan);

export default router;

import express from 'express';

import adminUserController from '../controllers/adminUsers';
import auth from '../helpers/authentication/auth';
import isAdminCheck from '../middleware/isAdmin';
import allCustomValidator from '../middleware/allCustomValidator';
import getUserId from '../middleware/getUserId';
import validateUserStatus from '../helpers/validation/status';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.patch('/:useremail/verify', auth.verifyToken, isAdminCheck, getUserId,
  allCustomValidator(validateUserStatus), adminUserController.adminVerifyUser);

router.get('', auth.verifyToken, isAdminCheck, adminUserController.adminViewUsers);

export default router;

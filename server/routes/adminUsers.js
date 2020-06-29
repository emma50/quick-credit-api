import express from 'express';

import adminUserController from '../controllers/adminUsers';
import auth from '../helpers/authentication/auth';
import isAdminCheck from '../middleware/isAdmin';
import allCustomValidator from '../middleware/allCustomValidator';
import validateUserStatus from '../helpers/validation/status';

const router = express.Router();

const { adminVerifyUser, adminViewUsers } = adminUserController;

router.patch('/:useremail/verify', auth.verifyToken, isAdminCheck, allCustomValidator(validateUserStatus), adminVerifyUser);
router.get('', auth.verifyToken, isAdminCheck, adminViewUsers);

export default router;

import express from 'express';

import adminUserController from '../controllers/adminUsers';
import auth from '../helpers/authentication/auth';
import isAdminCheck from '../middleware/isAdmin';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.patch('/:useremail/verify', auth.verifyToken, isAdminCheck, adminUserController.adminVerifyUser);
router.get('', auth.verifyToken, isAdminCheck, adminUserController.adminViewUsers);

export default router;

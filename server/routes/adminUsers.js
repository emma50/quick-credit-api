import express from 'express';

import adminUserController from '../controllers/adminUsers';
import auth from '../helpers/authentication/auth';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.patch('/:useremail/verify', auth.verifyToken, adminUserController.adminVerifyUser);
router.get('', auth.verifyToken, adminUserController.adminViewUsers);

export default router;

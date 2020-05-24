import express from 'express';

import adminUserController from '../controllers/adminUsers';

const router = express.Router();

// @route Get api/v1/users/test
// @desc Test post route
// @access Public

router.patch('/:useremail/verify', adminUserController.adminVerifyUser);

export default router;

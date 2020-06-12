import express from 'express';

import adminUserController from '../controllers/adminUsers';
import auth from '../helpers/authentication/auth';
import isAdminCheck from '../middleware/isAdmin';
import allCustomValidator from '../middleware/allCustomValidator';
import getUserId from '../middleware/getUserId';
import validateUserStatus from '../helpers/validation/status';

const router = express.Router();

/**
 * Route serving Admin Mark User as Verified.
 * @name patch/:useremail/verify
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @param {useremail} path - Express path
 */

router.patch('/:useremail/verify', auth.verifyToken, isAdminCheck, getUserId,
  allCustomValidator(validateUserStatus), adminUserController.adminVerifyUser);

router.get('', auth.verifyToken, isAdminCheck, adminUserController.adminViewUsers);

export default router;

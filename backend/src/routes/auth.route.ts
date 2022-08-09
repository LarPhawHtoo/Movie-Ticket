import express from 'express';
import { createUser } from '../controllers/user.controller';
import { body } from 'express-validator';
import { forgotPassword, resetPassword, checkResetPassword } from '../controllers/auth.controller';
import { logout, login } from '../controllers/auth.controller';

const router = express.Router();

router
  .route("/login")
  .post(
    [
      body("email").notEmpty().withMessage("Email must not be empty"),
      body("password").notEmpty().withMessage("Password must not be empty")
    ],
    login);

router.route("/logout").post([], logout);

router
  .route("/signup")
  .post(
    [
      body("fullName").notEmpty().withMessage("Name must not be empty"),
      body("email").notEmpty().withMessage("Email must not be empty"),
      body("password").notEmpty().withMessage("Password must not be empty")
    ],
    createUser);

router
  .route('/forgot-password')
  .post(
    [
      body("email").notEmpty().withMessage("Email must not be empty")
    ], forgotPassword);

router
  .route('/password-reset/:userId/:token')
  .get(checkResetPassword);

router
  .route('/password-reset-update/:userId/:token')
  .post(resetPassword);

export default router;
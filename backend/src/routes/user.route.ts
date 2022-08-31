import express from "express";
import {
  getUsers,
  createUser,
  findUser,
  updateUser,
  deleteUser,
  changePassword,
} from "../controllers/user.controller";
import { body } from "express-validator";
import { logout } from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(
    [
      body("fullName").notEmpty().withMessage("Name must note be empty"),
      body("email").notEmpty().withMessage("Email must note be empty"),
    ],
    createUser
  );

router.route("/logout").post([], logout);

//router.
//    route("/search")
//    .post(findByName)

router
  .route("/:id")
  .post(findUser)
  .put(updateUser)
  .delete(deleteUser);

router
  .route("/password-change/:id")
  .post(changePassword)

export default router;

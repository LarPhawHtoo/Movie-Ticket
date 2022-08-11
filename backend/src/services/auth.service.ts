import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import moment from 'moment';
import crypto from 'crypto';
import User from '../models/user.model';
import PasswordReset from '../models/password.reset';
import { sendEmail} from '../utils/sendEmail';
import session from 'express-session';

const loginService = async (req: Request, res: Response) => {
  User.findOne({ email: req.body.email }).then(async (user: any) => {
    if (!user) {
      return res.status(401).send({
        success: false,
        message:'Could not find user'
      })
    }
    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message:'Incorrect Password'
      })
    }
    const payload = {
      email: await bcrypt.hash(user.email, 12),
      id:await bcrypt.hash(user.id,12)
    }
    const token = jwt.sign(payload, 'secrect', { expiresIn: '1d' });

    return res.status(200).send({
      success: true,
      message: 'Login Successfully!',
      users: user,
      token: token
    }); 
  })
}

const logoutService = async (req: any, res: Response) => {
  req.session = null;
  return res.json({ "message": "Logout Successfully" });
};

export const forgetPasswordService = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send("Email does not exist");

    let token = await PasswordReset.findOne({ userId: user._id });
    if (!token) {
      token = await new PasswordReset({
        email: req.body.email,
        token: crypto.randomBytes(16).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASE_URL}/forget-password-update/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.status(200).json({
      message: "Password reset link sent to your email account"
    });
  } catch (error) {
    res.send("An error occured");
  }
};

export const checkResetPasswordService = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(401).send("Invalid link or expired");

    const token = await PasswordReset.findOne({
      email:user.email,
      token: req.params.token,
      createdAt: { $gte: moment().subtract(1, 'hours').utc() }
    });
    if (!token) return res.status(401).send("Invalid link or expired");
    user.password = await bcrypt.hash(req.body.password, 12);
    //user.password = req.body.password;
    await user.save();

    res.json({
      message: "Forget password sucessfully."
    });
  } catch (error) {
    res.send("An error occured");
  }
};

export const resetPasswordService = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(401).send("User Id does not exist");

    const passwordReset = await PasswordReset.findOne({
      token: req.params.token
    });
    if (!passwordReset) return res.status(401).send("Invalid link or expired");
    console.log(req.body.password);
    user.password = await bcrypt.hash(req.body.password, 12);
    await user.save();
    await passwordReset.delete();

    res.json({
      message: "Password reset sucessfully."
    });
  } catch (error) {
    res.send("An error occured");
  }
}

export { loginService, logoutService };

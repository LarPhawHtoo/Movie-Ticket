import { Request, Response } from "express";
import {  loginService, logoutService } from "../services/auth.service";
import { forgetPasswordService, checkResetPasswordService ,resetPasswordService} from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
  loginService(req, res);
};

export const logout = async (req: any, res: Response) => {
  logoutService(req, res);
};

export const forgotPassword = async (req: any, res: Response) => {
  forgetPasswordService(req, res);
};

export const checkResetPassword = async (req: any, res: Response) => {
  checkResetPasswordService(req, res);
};

export const resetPassword = async (req: Request, res: Response) => {
  resetPasswordService(req, res);
}



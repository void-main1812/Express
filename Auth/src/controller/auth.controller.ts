import { Request, Response } from "express";
import { CreateSessionInput } from "../schema/auth.schema";
import { findUserByEmail } from "../service/user.service";
import { signAccessToken, signRefreshToken } from "../service/auth.service";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid Email of Password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send(message);
  }

  if (!user.verified) {
    return res.send("Please verify your email");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send(message);
  }

  const accessToken = signAccessToken(user);

  const refreshToken = await signRefreshToken({ userId: user._id.toString() });

  return res.send({ accessToken, refreshToken });
}

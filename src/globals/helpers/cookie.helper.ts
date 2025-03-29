import { Response } from 'express';

export function sendTokenToCookie(res: Response, accessToken: String) {
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
  });
}

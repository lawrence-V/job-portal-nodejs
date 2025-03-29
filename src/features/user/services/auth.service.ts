import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestException, NotFoundException } from '~/globals/cores/error.core';
import { generateToken } from '~/globals/helpers/jwt.helper';
import { User } from '@prisma/client';

class AuthService {
  public async signUp(requestBody: any) {
    const { email, name, password } = requestBody;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });
    const accessToken = await generateToken(user);

    return accessToken;
  }

  public async signIn(requestBody: any) {
    const { email, password } = requestBody;

    const userByEmail = await this.findUserByEmail(email);

    if (!userByEmail) throw new NotFoundException(`The email ${email} does no exist`);

    const isMatchPassword = await bcrypt.compare(password, userByEmail.password);
    if (!isMatchPassword) throw new BadRequestException('Invalid Credentials');

    const accessToken = await generateToken(userByEmail);

    return accessToken;
  }

  private async findUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: { email }
    });
  }
}

export const authService: AuthService = new AuthService();

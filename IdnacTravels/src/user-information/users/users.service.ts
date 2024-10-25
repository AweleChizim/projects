/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRefreshToken } from './entities/user-refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserRefreshTokenDto } from './dto/update-refresh-token.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRefreshToken)
    private userRefreshTokenRepository: Repository<UserRefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    //Check if email already exists
    const { email } = createUserDto;
    const emailExists = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (emailExists) {
      throw new BadRequestException('Account already exists');
    }

    //Hash user's password
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;

    //Create a new user's account and save in the DB
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return { message: 'User Created' };
  }

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    //Check if user exists using user's email
    const userExists = await this.userRepository.findOne({
      where: {
        email,
      },
      select: {
        password: true,
        firstName: true,
        lastName: true,
        email: true,
        id: true,
      },
    });
    if (!userExists) {
      throw new UnauthorizedException(
        'Invalid login details. Please SignUp or Try again.',
      );
    }
    //Confirm the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExists.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException(
        'Invalid login details\nPlease SignUp or try again',
      );
    }
    //Generate JWT tokens for the session
    const userToken = await this.getUserTokens(userExists.id);
    return {
      ...userToken,
      userId: userExists.id,
    };
  }

  async changePassword(userId, oldPassword: string, newPassword: string) {
    //Find user in the db
    //Check if the old password entered matches the one in the db
    //Change the user's password to the new password entered
  }

  async refreshTokens(userRefreshToken: string) {
    //Check if user's token is still valid
    const userToken = await this.userRefreshTokenRepository.findOne({
      where: {
        userToken: userRefreshToken,
        expiryDate: MoreThan(new Date()),
      },
    });
    //Token has expired
    if (!userToken) {
      throw new UnauthorizedException('Session Timeout! Please login again.');
    }

    //Token is still valid
    return this.getUserTokens(userToken.userId);
  }

  async getUserTokens(userId) {
    const userAccessToken = this.jwtService.sign(
      { userId },
      { expiresIn: '1h' },
    );
    const userRefreshToken = uuidv4();

    await this.saveRefreshToken(userRefreshToken, userId);
    return {
      userAccessToken,
      userRefreshToken,
    };
  }

  async saveRefreshToken(userToken: string, userId) {
    //Expiry date is in 1 day
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    //Ensures there is only one token for each user in the db
    await this.userRefreshTokenRepository.update(
      { userId },
      { expiryDate, userToken },
    );

    const findUser = await this.userRefreshTokenRepository.findOne({
      where: { userId },
    });

    if (!findUser) {
      const newToken = await this.userRefreshTokenRepository.create({
        userId,
        userToken,
        expiryDate,
      });
      await this.userRefreshTokenRepository.save(newToken);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

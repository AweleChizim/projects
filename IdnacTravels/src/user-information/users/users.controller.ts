import {
  Controller,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserAuthGuard } from 'src/guards/user-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //User SignUp
  @Post('signup') //users/signup
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  //User SignIn
  @Post('signin') //users/signin
  async signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.usersService.signIn(loginUserDto);
  }

  //User Refresh
  @Post('refresh') //users/refresh
  async refreshTokens(
    @Body(ValidationPipe) userRefreshTokenDto: UserRefreshTokenDto,
  ) {
    return this.usersService.refreshTokens(userRefreshTokenDto.tokenName);
  }

  //Change Password
  @UseGuards(UserAuthGuard)
  @Put('change-password') //users/change-password
  async changePassword(
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.usersService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  //Forgot Password

  //Reset Password

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

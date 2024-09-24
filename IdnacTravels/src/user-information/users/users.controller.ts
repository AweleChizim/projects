import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRefreshTokenDto } from './dto/refresh-token.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

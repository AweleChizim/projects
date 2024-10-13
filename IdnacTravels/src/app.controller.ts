import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAuthGuard } from './guards/user-auth.guard';

@UseGuards(UserAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  someProtectedRoute(@Req() req) {
    return { message: 'Resource Access Granted', userId: req.userId };
  }
}

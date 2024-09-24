import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('home.html')
  getHome() {
    return this.appService.getHome();
  }
  @Get('about-us')
  @Render('about-us.html')
  getAboutUs() {
    return this.appService.getAboutUs();
  }
  @Get('/hello')
  getHello() {
    return this.appService.getHello();
  }
}

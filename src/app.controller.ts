import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AllowAnonymous, OptionalAuth } from '@thallesp/nestjs-better-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  // @OptionalAuth()
  @AllowAnonymous()
  getHello(): Promise<any> {
    return this.appService.getHello();
  }
}

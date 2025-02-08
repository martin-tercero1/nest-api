import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

// Controllers should check permissions and types, validate to then connect to the services layers
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/html')
  getHello(): {first_name: string, 
               last_name: string} {
    // return this.appService.getHello();
    return { first_name : 'Andrei', 
    last_name:'Melu' };
  }
}

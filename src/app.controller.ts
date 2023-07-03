import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeaders } from './utils/decorators/headers.decorator';

@ApiHeaders({ withAuth: false })
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('TIGERS_SERVICE') private tigersService: ClientProxy) {}

  // Producer
  async sendMsg(@Body() msg: any) {
    return this.tigersService.send(
      {
        cmd: 'add-tiger',
      },
      msg,
    );
  }

  getHello(): string {
    return 'Ok';
  }
}

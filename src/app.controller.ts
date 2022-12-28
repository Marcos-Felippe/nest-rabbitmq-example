import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Consumer
  @MessagePattern({ cmd: 'add-snake' })
  async getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log(data);

    channel.ack(originalMsg);
  }

  // Produce
  @Post()
  async createPost(@Body() msg: any) {
    return this.appService.sendMsg(msg);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

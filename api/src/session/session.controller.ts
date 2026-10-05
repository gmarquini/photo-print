import { SessionService } from './session.service';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create() {
    return await this.sessionService.create();
  }

  @Get()
  async index() {
    return await this.sessionService.index();
  }

  @Get(':sessionId')
  async show(@Param('sessionId') sessionId: string) {
    return await this.sessionService.show(sessionId);
  }

  @Delete(':sessionId')
  async delete(@Param('sessionId') sessionId: string) {
    await this.sessionService.delete(sessionId);
    return;
  }

  @Patch(':sessionId/finish')
  async finish(@Param('sessionId') sessionId: string) {
    return await this.sessionService.finish(sessionId);
  }

  @Patch(':sessionId/cancel')
  async cancel(@Param('sessionId') sessionId: string) {
    return await this.sessionService.cancel(sessionId);
  }

  @Patch(':sessionId/send')
  async send(@Param('sessionId') sessionId: string) {
    return await this.sessionService.send(sessionId);
  }
}

import { SessionService } from './session.service';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create() {
    const session = await this.sessionService.create();
    return session;
  }

  @Get()
  async index() {
    const sessions = await this.sessionService.index();
    return sessions;
  }

  @Get(':sessionId')
  async show(@Param('sessionId') sessionId: string) {
    const session = await this.sessionService.show(sessionId);
    return session;
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
}

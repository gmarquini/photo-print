import { SessionService } from './session.service';
import { Controller, Delete, Param, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create() {
    const session = await this.sessionService.create();
    return session;
  }

  @Delete(':sessionId')
  async delete(@Param('sessionId') sessionId: string) {
    await this.sessionService.finish(sessionId);
    return;
  }
}

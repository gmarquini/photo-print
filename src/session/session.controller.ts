import { SessionService } from './session.service';
import { Controller, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create() {
    const session = await this.sessionService.create();
    return session;
  }
}

import { SessionService } from './session.service';
import { Controller, Post } from '@nestjs/common';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create() {
    return this.sessionService.create();
  }
}

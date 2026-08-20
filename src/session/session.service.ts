import { Injectable } from '@nestjs/common';
import { Session } from './entities/Session';

@Injectable()
export class SessionService {
  create() {
    return new Session();
  }
}

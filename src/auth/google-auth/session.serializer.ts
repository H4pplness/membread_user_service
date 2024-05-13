import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/database/entities/user.entity';
import { GoogleService } from './google.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly googleService: GoogleService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log("SERIALIZE USER");
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.googleService.findUser(payload.id);
    console.log("DESERIALIZE USER : ",user);
    return user ? done(null, user) : done(null, null);
  }
}

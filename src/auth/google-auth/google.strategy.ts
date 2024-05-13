import { Injectable } from '@nestjs/common';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { GoogleService } from './google.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly googleService: GoogleService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log(done);

    const user = await this.googleService.validateUser(
      profile.emails[0].value,
      profile.name.familyName,
      profile.name.givenName
    );

    return user || null;
  }
}

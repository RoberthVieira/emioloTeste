import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from "@nestjs/common";
import { AuthService } from './auth.service';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private authService: AuthService,
        configService: ConfigService
    ) {
        console.log('ID do Google no ENV:', configService.get<string>('GOOGLE_CLIENT_ID'));
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
            scope: ['profile', 'email'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
    ) {
        return this.authService.validateGoogleUser(profile);
    }
}
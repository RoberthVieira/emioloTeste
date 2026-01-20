import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./google.strategy";
import { UserModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
        PassportModule,
        UserModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'dev-secret',
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, GoogleStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule{}
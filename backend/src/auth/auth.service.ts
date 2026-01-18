import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateGoogleUser(profile: any) {
        const { id, displayName, emails, photos } = profile;

        const user = await this.usersService.findOrCreate({
            googleId: id,
            name: displayName,
            email: emails[0].value,
            avatar: photos[0]?.value,
        });

        return user;
    }
}
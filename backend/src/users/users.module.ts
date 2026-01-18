import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UsersControllers } from "./users.controller";
import { User, UserSchema } from "./users.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema}
        ]),
    ],
    controllers: [UsersControllers],
    providers: [UsersService],
    exports: [UsersService]
})
export class UserModule {}
import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersControllers {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
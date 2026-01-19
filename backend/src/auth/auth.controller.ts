import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { Response } from "express";

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // redireciona para o Google
    }
    
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req, @Res() res: Response) {
        const user = req.user;
    
        const name = encodeURIComponent(user.name);
        const email = encodeURIComponent(user.email);
        
        return res.redirect(`http://localhost:3001/home?name=${name}&email=${email}`);
    }
}
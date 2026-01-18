import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // redireciona para o Google
    }
    
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return {
            message: 'Usuário autenticado com sucesso',
            user: req.user,
        };
    }

    @Get('me')
    me(@Req() req){
        return req.user;
    }
}
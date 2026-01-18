import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

    // Rota que inicia o login do Google
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}

    // Rota de retorno (callback) após o login no Google
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        // O usuário logado estará em req.user
        return {
            message: 'Usuário autenticado com sucesso',
            user: req.user,
        };
    }
}
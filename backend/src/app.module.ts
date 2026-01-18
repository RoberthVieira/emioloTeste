import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InferenceModule } from './inference/inference.module';
import { EventsModule } from './events/events.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    //ConfigModule lê as variáveis de ambiente do arquivo .env
    // `isGlobal: true` faz com que de para usar o ConfigService em qualquer módulo sem precisar importar novamente
    ConfigModule.forRoot({ 
        isGlobal: true,
        envFilePath: join(process.cwd(), '.env'),
    }),

    //MongooseModule conecta o NestJS ao MongoDB de forma assíncrona
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) throw new Error('MONGO_URI não definido no .env');

        return { uri };
      }
    }),

    InferenceModule,
    EventsModule,
    HealthModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

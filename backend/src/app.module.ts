import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //Lê o .env
    ConfigModule.forRoot({ isGlobal: true }),

    //Conecta com o MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) throw new Error('MONGO_URI não definido no .env');

        return { uri };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

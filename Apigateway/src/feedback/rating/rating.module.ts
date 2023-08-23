import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
  
    ConfigModule.forRoot(),

    ClientsModule.register([
      {
        name: 'ENTREPRISE-MC',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3006,//parseInt(process.env.CATEGORIEMCPORT),
        }
      },
    ]),
    
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3010//parseInt(process.env.AUTHMCPORT),
        }
      },

    ]),
    ClientsModule.register([
      {
        name: 'UPLOAD-MC',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3004,//parseInt(process.env.CATEGORIEMCPORT),
        }
      },
    ]),

  ],
  controllers: [RatingController]
})
export class RatingModule {}

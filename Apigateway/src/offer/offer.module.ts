import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
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

  ],
  controllers: [OfferController]
})
export class OfferModule { }

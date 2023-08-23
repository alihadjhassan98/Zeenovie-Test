import { Module } from '@nestjs/common';
import { OfferRecommandationController } from './offer-recommandation.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
        name: 'CV-SERVICE',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3003,
        }
      },
    ]),
     ClientsModule.register([
      {
        name: 'ENTREPRISE-MC',
        transport: Transport.TCP,
        options: {
          host: "0.0.0.0",
          port: 3006,//parseInt(process.env.CATEGORIEMCPORT),
        }
      },
    ]),  ],

  controllers: [OfferRecommandationController]
})
export class OfferRecommandationModule {

}

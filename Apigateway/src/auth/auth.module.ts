import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';

@Module({
  imports: [
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
          port: 3003,//parseInt(process.env.CATEGORIEMCPORT),
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
    AuthModule
  ],
  providers: [
    ConfigService,


  ],
  controllers: [AuthController],

})
export class AuthModule {

}

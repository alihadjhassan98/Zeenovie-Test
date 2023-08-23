import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({

  imports:[
  
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
  
  controllers: [ProfileController]
})
export class ProfileModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuizGatewayController } from './quiz.controller'; // Replace 'QuizController' with the actual name of your Quiz controller file.
import { ReportController } from './Report.controller';


@Module({
    controllers: [QuizGatewayController,ReportController ], // Replace 'QuizController' with the actual name of your Quiz controller class.
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
        {
          name: 'QUIZ_SERVICE',
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
            port: 3012, // Replace with the port number of your Quiz microservice.
          },
        },
      ]),


      ClientsModule.register([
        {
          name: 'REPORT_SERVICE',
          transport: Transport.TCP,
          options: {
            host: '0.0.0.0',
            port: 3012, // Replace with the port number of your Quiz microservice.
          },
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
  })
  export class QuizModule {}
  
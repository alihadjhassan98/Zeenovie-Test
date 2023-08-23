import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3001);
  // app.setGlobalPrefix('jobseeker');
  // app.enableCors({
  //   origin: 'http://localhost:4200'
  // }) 
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3002);
  // app.setGlobalPrefix('jobseeker');
  // app.enableCors({
  //   origin: 'http://localhost:4200'
  // })

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3003,
      },
    },

  );
  await app.listen();
  console.log("microservice listening on port", process.env.PORT);

}
bootstrap();

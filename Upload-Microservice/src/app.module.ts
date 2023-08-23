import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UploadFilesModule } from './upload-files/upload-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UploadImageModule,
    UploadFilesModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }

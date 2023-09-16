import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import mongoConfig from '../mongo.config';
import { RoomModule } from './rooms/rooms.module';
@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig.uri),
    RoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

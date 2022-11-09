import { Module } from '@nestjs/common';
import { AuthModule, TasksModule } from '@realtimedb/task';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGOOSE_LINK),
     AuthModule,TasksModule],
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './Persons/person.module';

@Module({
  imports: [PersonModule, MongooseModule.forRoot('mongodb+srv://user:Q5kmzkn6a8sEBCMV@database.racwz.mongodb.net/NestJs-DataBase?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

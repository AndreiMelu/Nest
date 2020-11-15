import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PersonShema } from "./person.model";
import { PersonsController } from "./persons.controller";
import { PersonService } from './persons.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Person', schema : PersonShema }])],
    controllers: [PersonsController],
    providers: [PersonService]
})
export class PersonModule{}
import { PersonModule } from './person.module';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { from } from "rxjs";
import { Person } from "./person.model";
import { Model } from "mongoose";

@Injectable()
export class PersonService {
    private persons: Person[] = [];

    constructor(@InjectModel('Person') private readonly personModel: Model<Person>) { }

    async insertPerson(f_name: string, l_name: string, email: string, age: number) {
        // const personId = new Date().valueOf();
        const newPers = new this.personModel({
            first_name: f_name,
            last_name: l_name,
            email,
            age
        });

        const rez = await newPers.save();
        console.log(rez);
        return rez.id as string;
    }

    async getAllPersons() {
        const persons = await this.personModel.find().exec();
        // console.log(persons);
        return persons.map(
            (pers) => ({
                id: pers.id,
                first_name: pers.first_name,
                last_name: pers.last_name,
                email: pers.email,
                age: pers.age
            }));

        // return [...this.persons];
    }

    async getPersonById(persId: string) {
        const pers = await this.findPerson(persId);
        return {
            id: pers.id,
            first_name: pers.first_name,
            last_name: pers.last_name,
            email: pers.email,
            age: pers.age
        };
        // return await this.findPerson(persId)
    }


    async updatePersonById(id: string, first_name: string, last_name: string, email: string, age: number) {
        const updatedPerson =  await this.findPerson(id);
        if (first_name) {
            updatedPerson.first_name = first_name;
        }

        if (last_name) {
            updatedPerson.last_name = last_name;
        }

        if (email) {
            updatedPerson.email = email;
        }

        if (age) {
            updatedPerson.age = age;
        }

        updatedPerson.save();
    }
    

    // findPerson(id: number): [Person, number] {
    //     const index = this.persons.findIndex((person) => person.id == id);
    //     const person = this.persons.find((person) => person.id == id);
    //     if (!person) {
    //         throw new NotFoundException('Cound not found any person with id: ' + id)
    //     }
    //     return [person, index];
    // }

        async findPerson(id: string): Promise<Person> {
            let person;
        try{
            person = await this.personModel.findById(id).exec();
        } catch(error){
            throw new NotFoundException('Cound not found any person with id: ' + id)
        }
        
        if (!person) {
            throw new NotFoundException('Cound not found any person with id: ' + id)
        }
        return person;
    }

    async deletePerson(id: string) {
        const person = await this.findPerson(id);
        person.deleteOne();
        // await this.personModel.deleteOne({_id:id}).exec();

    }
}
import { Person } from './person.model';
import { PersonService } from './persons.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import e from 'express';
import { agent } from 'supertest';

@Controller('/persons')
export class PersonsController {
    constructor(private readonly persService: PersonService) { }

    @Post()
    async addPerson(
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
        @Body('age') age: number) {

        const persIdAsString = await this.persService.insertPerson(first_name, last_name, email, age);
        return {
            id: persIdAsString,
            FullName: first_name + " " + last_name
        };
    }

    @Get()
    async getAllPersons() {
        return { Persons: await this.persService.getAllPersons() };
    }

    @Get(':id')
    async getPersonById(@Param('id') persId: string) {
        return await this.persService.getPersonById(persId);
    }

    @Patch(':id')
    async updatePerson(
        @Param('id') persId: string,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
        @Body('age') age: number) {
        await this.persService.updatePersonById(persId, first_name, last_name, email, age);
        return 'Succesfull!'
    }

    @Delete(':id')
    async removePerson(@Param('id') persId: string){
        await this.persService.deletePerson(persId);
        return null;
    }
}

import * as mongoose from 'mongoose';

export const PersonShema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: String,
    age: Number
});

// export class Person{
//     first_name: string;
//     last_name: string;
//     email: string;
//     age: number;
//     constructor(first_name: string, last_name: string, email: string, age: number){
//         this.first_name=first_name;
//         this.last_name=last_name;
//         this.email=email;
//         this.age=age;
//     }

export interface Person extends mongoose.Document {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    age: number;
}
import mongoose from "mongoose";

export class CreateWorkerDto {
    name: string;
    age: number;
    experience: number;
    phone_number: string;
    username: string;
    speciality_id: mongoose.Schema.Types.ObjectId;
    description: string;
}

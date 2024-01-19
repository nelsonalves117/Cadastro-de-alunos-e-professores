import * as mongoose from 'mongoose';

export const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tia: { type: String, required: true },
    workload: { type: String, required: true },
    titration: { type: String, required: true }
})

export interface Teacher extends mongoose.Document {
    id: string;
    name: string;
    tia: string;
    workload: string;
    titration: string;
}
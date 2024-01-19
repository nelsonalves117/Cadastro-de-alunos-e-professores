import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tia: { type: String, required: true },
    course: { type: String, required: true }
})

export interface Student extends mongoose.Document {
    id: string;
    name: string;
    tia: string;
    course: string;
}
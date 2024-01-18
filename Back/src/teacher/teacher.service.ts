import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './teacher.model';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
    constructor(@InjectModel('Teacher') private readonly teacherModel: Model<Teacher>) { }

    async createTeacher(teacher: Teacher) {
        const studentModel = new this.teacherModel(
            {
                name: teacher.name,
                tia: teacher.tia,
                workload: teacher.workload,
                titration: teacher.titration
            }
        );
        const result = await studentModel.save();
        return result.id as string;
    }

    async readAllTeachers() {
        const teachers = await this.teacherModel.find().exec();
        return teachers.map(teacher => ({
            id: teacher.id,
            name: teacher.name,
            tia: teacher.tia,
            workload: teacher.workload,
            titration: teacher.titration
        }));
    }

    async getTeacherByTIA(tia: number) {
        const teacher = await this.teacherModel.findOne({ tia: tia });
        if (!teacher) {
            throw new NotFoundException('Could not find the teacher.');
        }
        return {
            id: teacher.id,
            name: teacher.name,
            tia: teacher.tia,
            workload: teacher.workload,
            titration: teacher.titration
        }
    }

    async updateTeacher(teacher: Teacher) {
        const updateTeacher = await this.teacherModel.findOne({ tia: teacher.tia })

        if (!updateTeacher) {
            throw new NotFoundException('Could not find the teacher.');
        }
        if (teacher.name) {
            updateTeacher.name = teacher.name;
        }
        if (updateTeacher.workload) {
            updateTeacher.workload = teacher.workload;
        }
        if (updateTeacher.titration) {
            updateTeacher.titration = teacher.titration;
        }
        updateTeacher.save();
        return {
            id: updateTeacher.id,
            name: updateTeacher.name,
            tia: updateTeacher.tia,
            workload: updateTeacher.workload,
            titration: updateTeacher.titration
        }
    }

    async deleteTeacher(tia: number) {
        const result = await this.teacherModel.deleteOne({ tia: tia }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find the teacher.');
        }
    }
}
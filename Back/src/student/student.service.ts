import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './student.model';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private readonly studentModel: Model<Student>) { }

    async createStudent(student: Student) {
        const studentModel = new this.studentModel(
            {
                name: student.name,
                tia: student.tia,
                course: student.course
            }
        );
        const result = await studentModel.save();
        return result.id as string;
    }

    async readAllStudents() {
        const students = await this.studentModel.find().exec();
        return students.map(student => ({
            id: student.id,
            name: student.name,
            tia: student.tia,
            course: student.course
        }));
    }

    async getStudentByTIA(tia: number) {
        const student = await this.studentModel.findOne({ tia: tia });
        if (!student) {
            throw new NotFoundException('Could not find the student.');
        }
        return {
            id: student.id,
            name: student.name,
            tia: student.tia,
            course: student.course
        }
    }

    async updateStudent(studant: Student) {
        const updateStudent = await this.studentModel.findOne({ tia: studant.tia })

        if (!updateStudent) {
            throw new NotFoundException('Could not find the student.');
        }
        if (studant.name) {
            updateStudent.name = studant.name;
        }
        if (studant.course) {
            updateStudent.course = studant.course;
        }
        updateStudent.save();
        return {
            id: updateStudent.id,
            name: updateStudent.name,
            tia: updateStudent.tia,
            course: updateStudent.course
        }
    }

    async deleteStudent(tia: number) {
        const result = await this.studentModel.deleteOne({ tia: tia }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find the student.');
        }
    }
}

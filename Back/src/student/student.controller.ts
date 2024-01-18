import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.model';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get()
    readAllStudents(): Promise<any> {
        return this.studentService.readAllStudents();
    }

    @Get(':tia')
    async getStudentByTIA(@Param('tia') tia: number): Promise<any> {
        return this.studentService.getStudentByTIA(tia);
    }

    @Post()
    async createStudent(@Body() student: Student): Promise<any> {
        var response = await this.studentService.createStudent(student);
        return { id: response };
    }

    @Patch()
    async updateStudent(@Body() student: Student) {
        await this.studentService.updateStudent(student);
    }

    @Delete(':tia')
    async deleteStudent(@Param('tia') tia: number) {
        await this.studentService.deleteStudent(tia);
    }
}

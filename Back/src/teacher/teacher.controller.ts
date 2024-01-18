import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.model';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) { }

    @Get()
    readAllTeachers(): Promise<any> {
        return this.teacherService.readAllTeachers();
    }

    @Get(':tia')
    async getTeacherByTIA(@Param('tia') tia: number): Promise<any> {
        return this.teacherService.getTeacherByTIA(tia);
    }

    @Post()
    async createTeacher(@Body() teacher: Teacher): Promise<any> {
        var response = await this.teacherService.createTeacher(teacher);
        return { id: response };
    }

    @Patch()
    async updateTeacher(@Body() teacher: Teacher) {
        await this.teacherService.updateTeacher(teacher);
    }

    @Delete(':tia')
    async deleteTeacher(@Param('tia') tia: number) {
        await this.teacherService.deleteTeacher(tia);
        return null;
    }
}
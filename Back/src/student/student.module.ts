import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentSchema } from './student.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule { }

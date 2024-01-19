import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [StudentModule, TeacherModule, MongooseModule.forRoot('')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

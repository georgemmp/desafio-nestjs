import { Controller, Get, UseGuards, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Task } from 'src/entities/task.entity';
import { TaskCreateDto } from 'src/dtos/task-create.dto';
import { ValidationPipe } from 'src/pipes/validation.pipes';

@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAll(@GetUser() user: User): Promise<Task[]> {
        return this.taskService.getAll(user);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.taskService.getOne(id, user);
    }

    @Post()
    save(@Body(new ValidationPipe()) taskData: TaskCreateDto, @GetUser() user: User): Promise<Task> {
        console.log('aqui')
        return this.taskService.save(taskData, user);
    }
}

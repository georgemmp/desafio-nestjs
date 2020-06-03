import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/repositories/TaskRepository';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';
import { TaskCreateDto } from 'src/dtos/task-create.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getAll(user: User): Promise<Task[]> {
        return await this.taskRepository.getAll(user);
    }

    async save(taskData: TaskCreateDto, user: User): Promise<Task> {
        return await this.taskRepository.createTask(taskData, user);
    }

    async getOne(id: number, user: User): Promise<Task> {
        return await this.taskRepository.getById(id, user);
    }
}

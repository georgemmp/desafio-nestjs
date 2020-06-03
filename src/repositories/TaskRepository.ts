import { EntityRepository, Repository } from "typeorm";
import { Task } from "src/entities/task.entity";
import { TaskCreateDto } from "src/dtos/task-create.dto";
import { User } from "src/entities/user.entity";
import { NotFoundException } from "@nestjs/common";
import { TaskUpdateDto } from "src/dtos/task-update";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getAll(user: User): Promise<Task[]> {
        return await Task.find({ user });
    }

    async createTask(taskDto: TaskCreateDto, user: User): Promise<Task> {
        const { title, description } = taskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.user = user;

        await task.save();

        delete task.user;

        return task;
    }

    async getById(id: number, user: User): Promise<Task> {
        const task = await Task.findOne({ where: {id, user} });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    async updateTask(id: number, taskData: TaskUpdateDto, user: User): Promise<Task> {
        const { description, title } = taskData;

        const task = await this.getById(id, user);

        task.description = description ? description : task.description;
        task.title = title ? title : task.title;
        
        await task.save();
        
        return task;
    }

    async destroy(id: number, user: User): Promise<void> {
        const result = await Task.delete({id, user});

        if (result.affected === 0) {
            throw new NotFoundException('Task not found');
        }
    }
}
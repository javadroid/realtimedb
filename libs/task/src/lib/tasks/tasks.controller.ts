import { Controller, Get } from '@nestjs/common';
import { Message } from '@realtimedb/api-interfaces';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

    constructor(private authService: TasksService) {}
    @Get('hello')
    getData(): Message {
      return this.authService.getData();
    }
}

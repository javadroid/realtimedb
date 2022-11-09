import { Injectable } from '@nestjs/common';
import { Message } from '@realtimedb/api-interfaces';

@Injectable()
export class TasksService {
    getData(): Message {
        return { message: 'Welcome to api! tasks' };
      }
}

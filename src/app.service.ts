import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    // const apiKey = this.configService.get('API_KEY');
    // const dbName = this.configService.get('DATABASE_NAME');
    console.log(dbName);
    console.log('Tasks from another API', this.tasks);
    return `Hello World! ${apiKey} ${dbName}`;
  }
}

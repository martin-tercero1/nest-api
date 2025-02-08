import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getMany(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('region') region: string,
  ): object {
    return {
      message: `Users with a limit of ${limit} and offset of ${offset} - ${region}`,
    };
  }

  @Get('/filter')
  getFiltered(@Param('filter') filter: string): object {
    return { message: `Users filtered by ${filter}` };
  }

  @Get('/:userId')
  getOne(@Param('userId') userId: string): object {
    return { message: `User - ID: ${userId}` };
  }

  @Get('/:userId/orders')
  getOrders(@Param('userId') userId: number): object {
    return this.userService.getOrdersByUser(userId);
  }

  @Post('/')
  create(@Body() payload: any): object {
    return {
      message: 'Creating a user',
      payload,
    };
  }

  @Put('/:userId')
  update(@Param('userId') userId: string, @Body() payload: any): object {
    return {
      message: 'Updating a user',
      userId,
      payload,
    };
  }

  @Delete('/:userId')
  delete(@Param('userId') userId: string): object {
    return {
      message: 'Deleting a user',
      userId,
    };
  }
}

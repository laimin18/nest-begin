import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('demos')
export class DemoController {
  constructor(private readonly userService: UserService) {}

  @Get('test1')
  getDemo() {
    return {
      id: 1,
      title: 'puppy',
    };
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user(Number(id));
  }

  @Post('user')
  @ApiBody({
    description: 'User data for creating a new user',
    //type: Object,
    required: true,
    schema: {
      properties: {
        email: {
          type: 'string',
          description: 'Email address of the user',
          example: 'user@example.com',
        },
        name: {
          type: 'string',
          description: 'Name of the user (optional)',
          example: 'John Doe',
        },
      },
      required: ['email'],
    },
  })
  async createUser(
    @Body() userData: { email: string; name?: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('user/:id')
  @ApiBody({
    required: true,
    schema: {
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
        },
        name: {
          type: 'string',
          example: 'John Doe',
        },
      },
      required: ['email'],
    },
  })
  async modifyUser(
    @Param('id') id: string,
    @Body() userData: { email: string; name?: string },
  ): Promise<UserModel> {
    const { email, name } = userData;
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: { email, name },
    });
  }
}

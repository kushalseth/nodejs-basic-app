
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  Patch
} from '@nestjs/common';
import { RoomService } from './rooms.service';
import { Room } from './rooms.model';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }
  @Post()
  async create(@Body() room: Room): Promise<any> {
    try {
      if (room.desks && room.desks > 0 && room.isBooked) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'You can not book a room if it has desks inside',
        };
      }
      const createdRoom = await this.roomService.create(room);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Room created successfully',
        data: createdRoom,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create room',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<any> {
    try {
      const rooms = await this.roomService.findAll(sort, order, page, limit);
      return {
        statusCode: HttpStatus.OK,
        message: 'Rooms retrieved successfully',
        data: rooms,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve rooms',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    try {
      const room = await this.roomService.findOne(id);
      if (room) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Room retrieved successfully',
          data: room,
        };
      } else {
        throw new NotFoundException('Room not found');
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve room',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('title/:title')
  async findByTitle(@Param('title') title: string): Promise<any> {
    try {
      const rooms = await this.roomService.findByTitle(title);
      return {
        statusCode: HttpStatus.OK,
        message: 'Rooms retrieved successfully',
        data: {
          items: rooms,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve rooms',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.roomService.delete(id);
    } catch (error) {
      throw new NotFoundException('Room not found');
    }
  }

  @Patch(':id/status')
  async toggleBookingStatus(@Param('id') id: string): Promise<any> {
    try {
      const updatedRoom = await this.roomService.toggleBookingStatus(id);
      if (updatedRoom) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Booking status toggled successfully',
          data: updatedRoom,
        };
      } else {
        throw new NotFoundException('Room not found');
      }
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to toggle booking status',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('bulk')
  async createBulk(@Body() rooms: Room[]): Promise<any> {
    try {
      const createdRooms = await this.roomService.createBulk(rooms);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Rooms created successfully',
        data: createdRooms,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to create rooms in bulk',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}

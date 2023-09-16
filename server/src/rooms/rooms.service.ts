import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './rooms.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) { }
  async create(room: Room): Promise<Room> {
    const existingRoom = await this.roomModel.findOne({ title: room.title });

    if (existingRoom) {
      throw new BadRequestException('Room with this title already exists');
    }

    const createdRoom = new this.roomModel({
      ...room
    });
    return createdRoom.save();
  }
  async findAll(sort?: string, order?: string, page?: number, limit?: number): Promise<any> {
    let query = this.roomModel.find();

    // Apply sorting if sort and order parameters are provided
    if (sort && order) {
      const sortOptions: any = {};
      sortOptions[sort] = order === 'asc' ? 1 : -1;
      query = query.sort(sortOptions);
    }

    // Apply pagination if page and limit parameters are provided
    if (page && limit) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      query = query.skip(startIndex).limit(limit);

      // Get the total count of documents for pagination metadata
      const totalCount = await this.roomModel.countDocuments().exec();

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalCount / limit);

      const items = await query.exec();

      return {
        items,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
        },
      };
    }

    const data = await query.exec();
    return {
      items: data,
    };
  }
  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }
  async delete(id: string): Promise<Room> {
    const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
    if (!deletedRoom) {
      throw new NotFoundException('Room not found');
    }
    return deletedRoom;
  }
  async findByTitle(title: string): Promise<Room[]> {
    const regex = new RegExp(title, 'i');
    const rooms = await this.roomModel.find({ title: regex }).exec();
    if (rooms.length === 0) {
      throw new NotFoundException('No rooms found with the searched title');
    }
    return rooms;
  }
  async findById(roomId: string): Promise<Room | null> {
    return this.roomModel.findById(roomId).exec();
  }
  async toggleBookingStatus(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    room.isBooked = !room.isBooked;
    return room.save();
  }
  async createBulk(rooms: Room[]): Promise<Room[]> {
    const createdRooms: Room[] = [];

    for (const room of rooms) {
      const createdRoom = await this.create(room);
      createdRooms.push(createdRoom);
    }

    return createdRooms;
  }
}

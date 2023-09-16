import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {

    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description: string;

    @Prop({ required: true, unique: true })
    imageURL: string;

    @Prop({ required: true })
    isBooked: boolean;

    @Prop({ required: false })
    desks: number;

    createdAt: Date;

    modifiedAt: Date;

}

export const RoomSchema = SchemaFactory.createForClass(Room);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Exclude } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ length: 30, required: true })
  firstName: string;

  @Prop({ length: 30, required: true })
  lastName: string;

  @Prop({ length: 50, unique: true, required: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Prop({ required: true })
  password: string;

  @Prop({ length: 20 })
  phone: string;

  @Exclude()
  @Prop({ default: false })
  delete: boolean;

  @Prop()
  refreshToken: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

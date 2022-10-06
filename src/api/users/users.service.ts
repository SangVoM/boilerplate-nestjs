import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly model: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await new this.model({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  }

  async findOneEmail(email: string): Promise<User> {
    return await this.model.findOne({ email }).exec();
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<User> {
    return await this.model.findById(id, { password: 0, __v: 0 }).exec();
  }

  async update(
    id: mongoose.Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.model.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}

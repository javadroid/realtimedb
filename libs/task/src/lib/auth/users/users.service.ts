import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '@realtimedb/api-interfaces';
import { Model } from 'mongoose';
import { UserDTO } from '../../../dto/user.dto';
import { User, UserDoc } from '../../../schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDoc>) {}

  async create(createUser: UserDTO): Promise<User> {
    try {
      const createdUser = await new this.userModel(createUser);

      return await createdUser.save();
    } catch (error) {
      throw new NotAcceptableException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyId(id: any): Promise<User> {
    try {
      return this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findbyAny(id: string, value: string): Promise<User[]> {

    const result = await this.userModel.find({ [id]: value }).exec();
    if (!result) {
      throw new NotFoundException(value+' not found in fleid ' +id);
    }
    return result;
  }

  async update(_id: string, updateUser: UserDTO): Promise<User> {
    try {
      return this.userModel.findByIdAndUpdate({ _id }, updateUser).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async delete(_id: string): Promise<User> {
    try {
      return this.userModel.findByIdAndDelete({ _id }).exec();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

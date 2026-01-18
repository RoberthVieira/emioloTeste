import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    async findOrCreate(data: any) {
        let user = await this.userModel.findOne({ email: data.email })

        if(user){
            return user;
        }

        return this.userModel.create(data);
    }

    async findAll() {
        return this.userModel.find();
    }
}
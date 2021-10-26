import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import LoginUserDto from './dto/login.user.dto';
import CreateUserDto from "./dto/create.user.dto";
import CreateUserData from "./interface/create.user";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const saltRounds: number = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(userData: CreateUserDto): Promise<CreateUserData> {
    userData.password = await bcrypt.hash(userData.password, saltRounds);
    const createdUser = new this.userModel(userData);

    const createUserResponse: CreateUserData = {
      email: userData.email,
      message: "user created"
    };

    try {
      await createdUser.save();
    } catch {
      createUserResponse.message = "user creation failed"
    }

    return createUserResponse;
  }

  async findOne({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  public generateJWT(user) {
    const today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      email: user.email,
      exp: exp.getTime() / 1000,
    }, process.env.TOKEN_SECRET);
  };
}
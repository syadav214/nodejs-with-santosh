import { Post, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import UserRO from './interface/login.user';
import LoginUserDto from './dto/login.user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import CreateUserDto from "./dto/create.user.dto";

import {
    ApiResponse,
    ApiOperation,
} from '@nestjs/swagger';

@Controller("api/v1/users")
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @Post("/register")
    async create(@Body() userData: CreateUserDto) {
        return this.userService.create(userData);
    }

    @ApiOperation({ summary: 'User logged in' })
    @ApiResponse({ status: 200, description: 'The user has been logged in.' })
    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.userService.findOne(loginUserDto);

        const errors = { User: ' not found' };
        if (!_user) throw new HttpException({ errors }, 401);

        const token = await this.userService.generateJWT(_user);
        const { email } = _user;
        const user = { email, token };
        return { user }
    }
}
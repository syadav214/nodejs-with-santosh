import { Get, Post, Body, Put, Delete, Param, Controller } from '@nestjs/common';
import { FilmService } from './film.service';
import { Film } from './schema/film.schema';
import CreateFilmDto from "./dto/create.film.dto";

import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth("access-token")
@Controller("api/v1/films")
export class FilmController {

    constructor(private readonly filmService: FilmService) { }

    @ApiOperation({ summary: 'Create film' })
    @ApiResponse({ status: 201, description: 'The film has been successfully created.' })
    @ApiBearerAuth()
    @Post()
    async create(@Body() filmData: CreateFilmDto) {
        return this.filmService.create(filmData);
    }

    @ApiOperation({ summary: 'Get all film' })
    @ApiResponse({ status: 200, description: 'Return all film.' })
    @Get()
    async findAll(): Promise<Film[]> {
        return await this.filmService.findAll();
    }

    @ApiOperation({ summary: 'Update film' })
    @ApiResponse({ status: 204, description: 'The film has been successfully updated.' })
    @Put(':filmId')
    async update(@Param('filmId') filmId, @Body() filmData: CreateFilmDto) {
        return this.filmService.update(filmId, filmData);
    }

    @ApiOperation({ summary: 'Delete film' })
    @ApiResponse({ status: 200, description: 'The film has been successfully deleted.' })
    @Delete(':filmId')
    async delete(@Param('filmId') filmId) {
        return this.filmService.delete(filmId);
    }

}
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schema/film.schema';
import CreateFilmDto from "./dto/create.film.dto";
import IDeleteFilm from "./interface/delete.film";

@Injectable()
export class FilmService {
    constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) { }

    async create(filmData: CreateFilmDto): Promise<Film> {
        const createdFilm = new this.filmModel(filmData);
        return createdFilm.save();
    }

    async findAll(): Promise<Film[]> {
        return this.filmModel.find().exec();
    }

    async update(filmId: string, filmData: CreateFilmDto): Promise<Film> {
        let toUpdate = await this.filmModel.findById(filmId);
        let updated = Object.assign(toUpdate, filmData);
        return updated.save();
    }

    async delete(filmId: string): Promise<IDeleteFilm> {
        const deleteResponse: IDeleteFilm = {
            deleted: true
        }

        try {
            await this.filmModel.findByIdAndRemove(filmId);
        } catch (ex) {
            deleteResponse.deleted = false;
        }
        return deleteResponse;
    }
}
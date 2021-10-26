import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Film, FilmSchema } from './schema/film.schema';
import CreateFilmDto from "./dto/create.film.dto";
import IDeleteFilm from "./interface/delete.film";

describe('FilmController', () => {
    let filmController: FilmController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                MongooseModule.forRoot(process.env.MONGO_CONN_STRING),
                MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])
            ],
            controllers: [FilmController],
            providers: [FilmService],
        }).compile();

        filmController = app.get<FilmController>(FilmController);
    });

    describe('film controller', () => {
        it('should return films', async () => {
            const films: Film[] = await filmController.findAll();
            expect(films.length).toBeGreaterThan(0);
        });

        let newFilmId: string = "";
        const filmData: CreateFilmDto =
        {
            name: "TESTMOV",
            desc: "TESTMOV",
            releaseDate: new Date(),
            rating: 5,
            ticketPrice: 500,
            country: "USA",
            genre: "action",
            photo: "NA"
        };

        it('should create film', async () => {
            const film: Film = await filmController.create(filmData);
            expect(film.name).toEqual(filmData.name);
            newFilmId = film["_id"];
        });

        it('should update film', async () => {
            const updateMovieName: string = "updateMovieName";
            let updated = { ...filmData };
            updated["name"] = updateMovieName;

            const film: Film = await filmController.update(newFilmId, updated);
            expect(film.name).toEqual(updateMovieName);
        });

        it('should delete film', async () => {
            const deleteResponse: IDeleteFilm = await filmController.delete(newFilmId);
            expect(deleteResponse.deleted).toEqual(true);
        });
    });
});

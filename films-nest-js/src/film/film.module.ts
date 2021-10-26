import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schema/film.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])],
  providers: [FilmService],
  controllers: [
    FilmController
  ],
})

export class FilmModule {}

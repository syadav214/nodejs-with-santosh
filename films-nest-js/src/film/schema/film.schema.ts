import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    desc: string;

    @Prop({ required: true })
    releaseDate: Date;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    ticketPrice: number;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    photo: string;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
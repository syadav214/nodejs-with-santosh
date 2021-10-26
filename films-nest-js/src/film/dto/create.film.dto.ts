export default class CreateFilmDto {
    readonly name: string;
    readonly desc: string;
    readonly releaseDate: Date;
    readonly rating: number;
    readonly ticketPrice: number;
    readonly country: string;
    readonly genre: string;
    readonly photo: string;
}
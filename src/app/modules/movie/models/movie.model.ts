import {IMovieLocation} from './movie-location.model';

export class Movie {
  id: number;
  name: string;
  bigImage: string;
  smallImage: string;
  genre: [string, string];
  released: boolean;
  // todo: add genre, release, PG
  constructor({id, name, bigImage, smallImage, genre, released}: MovieModelDto = {
    id: 0, name: '', bigImage: '', smallImage: '', genre: ['string', 'string'], released: true
  }) {
    this.id = id;
    this.name = name;
    this.bigImage = bigImage;
    this.smallImage = smallImage;
    this.genre = genre;
    this.released = released;
  }

  public static fromJSON(attributes: any): Movie {
    return new Movie({
      id: attributes.id,
      name: attributes.name,
      bigImage: attributes.bigImage,
      smallImage: attributes.smallImage,
      genre: attributes.genre,
      released: attributes.released,
    });
  }
}


export interface MovieModelDto {
  id: number;
  name: string;
  bigImage: string;
  smallImage: string;
  genre: [string, string];
  released: boolean;
}


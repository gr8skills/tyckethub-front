export class Movie {
  id: number;
  name: string;
  bigImage: string;
  smallImage: string;

  constructor({id, name, bigImage, smallImage}: MovieModelDto = {
    id: 0, name: '', bigImage: '', smallImage: ''
  }) {
    this.id = id;
    this.name = name;
    this.bigImage = bigImage;
    this.smallImage = smallImage;
  }
}


export interface MovieModelDto {
  id: number;
  name: string;
  bigImage: string;
  smallImage: string;
}

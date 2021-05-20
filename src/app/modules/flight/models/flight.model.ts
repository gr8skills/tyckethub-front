export class Flight {
  id: number;
  name: string;
  type: string;
  bigImageUrl: string;
  smallImageUrl: string;

  constructor(
    {id, name, type, bigImageUrl, smallImageUrl}: FlightDTO = {
      id: 0, name: '', type: '', bigImageUrl: '', smallImageUrl: ''
    }) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.bigImageUrl = bigImageUrl;
    this.smallImageUrl = smallImageUrl;
  }
}

export interface FlightDTO {
  id: number;
  name: string;
  type: string;
  bigImageUrl: string;
  smallImageUrl: string;
}

export enum FlightType {
  Featured = 'FEATURED',
  Normal = 'NORMAL',
}

import {IEventLocation} from './event-location.model';

export class Event {

  id: number;
  uId?: string;
  bannerUrl?: string;
  mobileImageUrl?: string;
  thumbUrl?: string;
  title: string;
  status: string;
  imageUrl: string;
  date: Date;
  isFavorite?: boolean;

  constructor(
    {id, title, status, imageUrl, date}: EventDto = {
      id: 0,
      title: '',
      status: '',
      imageUrl: '',
      date: new Date()
    }
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.imageUrl = imageUrl;
    this.date = date;
  }

  public static fromJSON(attributes: any): Event {
    return new Event({
      id: attributes.id,
      title: attributes.name,
      status: attributes.status,
      imageUrl: attributes.thumb,
      date: `${attributes.start_date} ${attributes.start_time}` as unknown as Date,
      uId: attributes.uid,
      bannerUrl: attributes.banner,
      mobileImageUrl: attributes.mobile_image,
      thumbUrl: attributes.thumb
    });
  }
}

export interface EventDto {
  id: number;
  title: string;
  status: string;
  imageUrl: string;
  date: Date;
  uId?: string;
  bannerUrl?: string;
  mobileImageUrl?: string;
  thumbUrl?: string;
  isFavorite?: boolean;
}

export enum EventStatus {
  OnSale = 'ON SALE',
  SaleEnded = 'SALES ENDED',
  Postponed = 'POSTPONED',
}

export interface IEvent {
  id: number;
  userId: number;
  user?: string;
  title: string;
  status?: string;
  statusId: number;
  imageUrl?: string;
  description: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  ageRestriction?: string;
  displayStartTime: string;
  displayEndTime: string;
  createAt: Date;
  categoryIds?: number[];
  tags: string[];
  location: IEventLocation;
}

import {Event, EventStatus} from '../event/models/event.model';
import {Flight, FlightType} from '../flight/models/flight.model';
import { Movie } from '../movie/models/movie.model';

export const EVENTS: Event[] = [
  new Event({
    id: 1,
    title: 'The Book of Jacob: Knox Count...',
    status: EventStatus.OnSale,
    imageUrl: 'assets/images/img_13.png',
    date: new Date()
  }),
  new  Event({
    id: 2,
    title: 'Wazobia Festival 2021',
    status: EventStatus.SaleEnded,
    imageUrl: 'assets/images/img_14.png',
    date: new Date()
  }),
  new Event({
    id: 3,
    title: 'Flame Resturant & Bar Drive',
    status: EventStatus.Postponed,
    imageUrl: 'assets/images/img_9.png',
    date: new Date()
  }),
  new Event({
    id: 4,
    title: 'Landfair 2.0',
    status: EventStatus.OnSale,
    imageUrl: 'assets/images/img_33.png',
    date: new Date()
  }),
  new Event({
    id: 5,
    title: 'Eko Biggest Pool Party',
    status: EventStatus.SaleEnded,
    imageUrl: 'assets/images/img_34.png',
    date: new Date()
  }),
  new Event(  {
    id: 6,
    title: 'Focus Africa Award 2021',
    status: EventStatus.Postponed,
    imageUrl: 'assets/images/img_35.png',
    date: new Date()
  })
];

export const EVENTS_MORE: Event[] = [
  new Event({
    id: 7,
    title: 'Comedy Dinner With Slimbone',
    status: EventStatus.OnSale,
    imageUrl: 'assets/images/img_20.png',
    date: new Date()
  }),
  new Event({
    id: 8,
    title: 'Diamanti In Style Yatch',
    status: EventStatus.SaleEnded,
    imageUrl: 'assets/images/img_18.png',
    date: new Date()
  }),
  new Event({
    id: 9,
    title: 'Revs And Run Away (2021)',
    status: EventStatus.Postponed,
    imageUrl: 'assets/images/img_15.png',
    date: new Date()
  }),
  new Event({
    id: 10,
    title: 'Stormzy H.I.T.H World Tour',
    status: EventStatus.OnSale,
    imageUrl: 'assets/images/img_19.png',
    date: new Date()
  }),
  new Event({
    id: 11,
    title: 'Kolor Fest',
    status: EventStatus.SaleEnded,
    imageUrl: 'assets/images/img_16.png',
    date: new Date()
  }),
  new Event({
    id: 12,
    title: 'Karoke Battle',
    status: EventStatus.Postponed,
    imageUrl: 'assets/images/img_17.png',
    date: new Date()
  }),
];

export const COUNTRIES = [
  {
    name: 'Nigeria',
    flag: ''
  },
  {
    name: 'Ghana',
    flag: ''
  },
  {
    name: 'South Africa',
    flag: ''
  },
  {
    name: 'Gabon',
    flag: ''
  }
];

export const FLIGHTS: Flight[] = [
  new Flight({
    id: 1,
    name: 'Edinburgh, United Kingdom',
    type: FlightType.Normal,
    bigImageUrl: 'assets/images/img_52.png',
    smallImageUrl: 'assets/images/img_58.png'
  }),
  new Flight({
    id: 2,
    name: 'New York, United States',
    type: FlightType.Normal,
    bigImageUrl: 'assets/images/img_61.png',
    smallImageUrl: 'assets/images/img_63.png'
  }),
  new Flight({
    id: 3,
    name: 'Venice, Italy',
    type: FlightType.Normal,
    bigImageUrl: 'assets/images/img_57.png',
    smallImageUrl: 'assets/images/img_62.png'
  }),
];

export const MORE_FLIGHTS: Flight[] = [
  new Flight({
    id: 4,
    name: 'Las Vegas, United States',
    type: FlightType.Normal,
    bigImageUrl: 'assets/images/img_44.png',
    smallImageUrl: 'assets/images/img_54.png'
  }),
  new Flight({
    id: 5,
    name: 'Minneapolis, United States',
    type: FlightType.Normal,
    bigImageUrl: 'assets/images/img_42.png',
    smallImageUrl: 'assets/images/img_50.png'
  }),
  new Flight({
    id: 6,
    name: 'Ontario, United States',
    type: FlightType.Normal,
    bigImageUrl: 'assets/images/img_44.png',
    smallImageUrl: 'assets/images/img_54\.png'
  }),
  new Flight({
    id: 7,
    bigImageUrl: 'assets/images/img_59.png',
    type: FlightType.Featured,
    smallImageUrl: 'assets/images/img_59.png',
    name: 'Bridgetown, Barnados',
  })
];


export const MOVIES: Movie[] = [
  new Movie({
    id: 1,
    name: 'Rattle Snake',
    bigImage: 'assets/images/img_78.png',
    smallImage: 'assets/images/img_77.png',
    genre: ['Action', 'Thriller'],
    released: true
  }),
  new Movie({
    id: 2,
    name: 'The Croods A New Age',
    bigImage: 'assets/images/img_72.png',
    smallImage: 'assets/images/img_71.png',
    genre: ['Action', 'Drama'],
    released: true
  }),
  new Movie({
    id: 3,
    name: 'Voiceless',
    bigImage: 'assets/images/img_74.png',
    smallImage: 'assets/images/img_73.png',
    genre: ['Drama', 'Action'],
    released: false
  }),
  new Movie({
    id: 4,
    name: 'Fati',
    bigImage: 'assets/images/img_76.png',
    smallImage: 'assets/images/img_75.png',
    genre: ['Comedy', ''],
    released: true
  }),
  new Movie({
    id: 5,
    name: 'Tenet',
    bigImage: 'assets/images/img_85.png',
    smallImage: 'assets/images/img_84.png',
    genre: ['Action', ''],
    released: true,
  }),
  new Movie({
    id: 6,
    name: 'Loud',
    bigImage: 'assets/images/img_70.png',
    smallImage: 'assets/images/img_79.png',
    genre: ['Blockbuster', 'Comedy'],
    released: true
  }),
  new Movie({
    id: 7,
    name: 'Kambili',
    bigImage: 'assets/images/img_81.png',
    smallImage: 'assets/images/img_80.png',
    genre: ['Thriller', 'Action'],
    released: false
  }),
  new Movie({
    id: 8,
    name: 'Wonder Woman 1984',
    bigImage: 'assets/images/img_83.png',
    smallImage: 'assets/images/img_82.png',
    genre: ['Comedy', 'Action'],
    released: false
  }),
  new Movie({
    id: 9,
    name: 'Finding Hubby',
    bigImage: 'assets/images/img_93.png',
    smallImage: 'assets/images/img_92.png',
    genre: ['Thriller', 'Action'],
    released: false
  }),
  new Movie({
    id: 10,
    name: 'Greenland',
    bigImage: 'assets/images/img_87.png',
    smallImage: 'assets/images/img_86.png',
    genre: ['Thriller', 'Action'],
    released: false
  }),
  new Movie({
    id: 11,
    name: 'Quam\'s Money',
    bigImage: 'assets/images/img_89.png',
    smallImage: 'assets/images/img_88.png',
    genre: ['Blockbuster', 'Action'],
    released: false
  }),
  new Movie({
    id: 12,
    name: 'Broken Hearted',
    bigImage: 'assets/images/img_91.png',
    smallImage: 'assets/images/img_90.png',
    genre: ['Drama', 'Action'],
    released: true
  }),
  new Movie({
    id: 13,
    name: 'Son of Mercy',
    bigImage: 'assets/images/img_101.png',
    smallImage: 'assets/images/img_100.png',
    genre: ['Thriller', 'Action'],
    released: true
  }),
  new Movie({
    id: 14,
    name: 'Love Bane',
    bigImage: 'assets/images/img_95.png',
    smallImage: 'assets/images/img_94.png',
    genre: ['Comedy', 'Thriller'],
    released: true
  }),
  new Movie({
    id: 15,
    name: 'The War with Grandpa',
    bigImage: 'assets/images/img_97.png',
    smallImage: 'assets/images/img_96.png',
    genre: ['Blockbuster', 'Action'],
    released: true
  }),
  new Movie({
    id: 16,
    name: 'Lady Buckit and The Montley Monster',
    bigImage: 'assets/images/img_99.png',
    smallImage: 'assets/images/img_98.png',
    genre: ['Thriller', 'Action'],
    released: true
  }),
];

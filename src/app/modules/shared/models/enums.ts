export enum Roles {
  ADMIN = 'admin',
  STAFF = 'staff',
  ORGANIZER = 'organizer',
  ATTENDEE = 'attendee'
}

export enum EventTicketType {
  FREE = 'free',
  PAID = 'paid',
  INVITE = 'invite'
}

export enum MovieTicketType {
  FREE = 'free',
  PAID = 'paid',
  INVITE = 'invite'
}

export enum LocalStorageItems {
  RETURN_URL = 'returnUrl',
  CREATED_EVENT = 'createdEvent',
  CREATED_MOVIE = 'createdMovie',
  TO_ARTISTE_TAB = 'toArtisteTab',
  ACCESS_TOKEN = 'access_token',
  CURRENT_USER = 'currentUser',
  USER_DATA = 'currentUserData',
  EVENT_PROGRESS = 'eventProgress',
  MOVIE_PROGRESS = 'movieProgress',
  EVENT_ONLINE_DETAILS = 'eventOnlineDetails',
  MOVIE_ONLINE_DETAILS = 'movieOnlineDetails',
  EVENT_TICKET_DATA = 'eventTicketData',
  MOVIE_TICKET_DATA = 'movieTicketData',
  EVENT_TICKET_SETTING = 'eventTicketSetting',
  MOVIE_TICKET_SETTING = 'movieTicketSetting',
  DELETE_TABLE_ITEM = 'deleteTableItem',
  ADMIN_APPROVE_EVENT = 'adminApproveEvent',
  ADMIN_APPROVE_MOVIE = 'adminApproveMovie',
}

export enum EventImageTypes {
  BANNER = 'banner',
  COVER = 'thumb',
  MOBILE = 'mobile'
}

export enum MovieImageTypes {
  COVER = 'thumb',
  OTHER = '',
}


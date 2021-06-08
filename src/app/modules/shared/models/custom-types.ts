export interface EventUploadedImages {
  banner?: string;
  mobile?: string;
  thumb?: string;
}

export interface MovieUploadedImages {
  thumb?: string;
}

export interface EventTicket {
  id: number;
  price: number;
  maximumAllowed: number;
  title: string;
  type: 1;
}

export interface OrganizerTicketTableData {
  eventName: string;
  ticketSold: number;
  totalTicket: number;
  ticketType: string;
  ticketId: string;
  pricePerTicket: number;
  status: string;
}

export interface AttendeeTicketTableData {
  eventName: string;
  date: Date;
  quantity: number;
  ticketType: string;
  ticketId: string;
  price: number;
  status: string;
}

export interface TicketResellDialogResult {
  response: any;
  success: boolean;
}

export enum TimeFormats {
  AP = 'am-pm',
  FULL = 'full'
}

export function copyUrl(url: string, utilFunction: () => void): any {
  return utilFunction();
}

export function postponeEvent(url: string, utilFunction: () => void): void {
  return utilFunction();
}

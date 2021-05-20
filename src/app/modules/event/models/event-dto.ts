export class EventDto {
  id?: number;
  name?: string;
  description?: string;
  user_id?: number;
  category_ids?: number[];
  age_restriction?: string;
  event_status_id?: number;
  tags?: string[];
  organizer?: string;
  location?: { platform: string; address?: string; city?: string; state?: number; country?: number } | undefined;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  display_start_time?: number;
  display_end_time?: number;
  artiste_ids?: number[];

  constructor(formValue: RawEventFormValue) {
    this.id = formValue?.id;
    this.name = formValue.title;
    this.age_restriction = formValue.ageRestriction;
    this.category_ids = formValue.category;
    this.description = formValue.description;
    this.organizer = formValue.organizer;
    this.user_id = formValue.userId;
    this.event_status_id = formValue.statusId;
    this.location = formValue.location;
    this.tags = formValue.tags;
    this.start_date = (formValue.startDate instanceof Date) ? formValue.startDate?.toISOString() : formValue.startDate;
    this.end_date = (formValue.endDate instanceof Date) ? formValue.endDate?.toISOString() : formValue.endDate;
    this.start_time = formValue.startTime;
    this.end_time = formValue.endTime;
    this.display_start_time = formValue.displayStartTime ? 1 : 0;
    this.display_end_time = formValue.displayEndTime ? 1 : 0;
    this.artiste_ids = formValue.artistes;
  }
}

export interface RawEventFormValue {
  id?: number;
  title?: string;
  description?: string;
  organizer?: string;
  userId?: number;
  category?: number[];
  ageRestriction?: string;
  statusId?: number;
  tags?: string[];
  artistes?: number[];
  location?: {
    platform: string
    address?: string;
    city?: string;
    state?: number;
    country?: number;
  };
  startDate?: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  displayStartTime?: boolean;
  displayEndTime?: boolean;
}


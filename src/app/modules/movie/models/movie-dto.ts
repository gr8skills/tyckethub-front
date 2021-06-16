export class MovieDto {
  id?: number;
  name?: string;
  description?: string;
  // tslint:disable:variable-name
  user_id?: number;
  genre_ids?: number[];
  age_restriction?: string;
  event_status_id?: number;
  tags?: string[];
  location?: { platform: string; address?: string; city?: string; state?: number; country?: number } | undefined;
  start_date?: string;
  start_time?: string;
  end_date?: string;
  end_time?: string;
  display_start_time?: number;
  display_end_time?: number;
  artiste_ids?: number[];

  constructor(formValue: RawMovieFormValue) {
    this.id = formValue?.id;
    this.name = formValue.title;
    this.age_restriction = formValue.ageRestriction;
    this.genre_ids = formValue.genre;
    this.description = formValue.description;
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

export interface RawMovieFormValue {
  id?: number;
  title?: string;
  description?: string;
  userId?: number;
  genre?: number[];
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


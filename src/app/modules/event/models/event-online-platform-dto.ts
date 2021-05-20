export class EventOnlinePlatformDto {
  platform_name: string;
  title: string;
  platform_url: string;
  description: string;

  constructor(formValue: EventOnlinePlatformRawFormData) {
    this.platform_name = formValue.platformName;
    this.title = formValue.title;
    this.platform_url = formValue.url;
    this.description = formValue.description;
  }
}


export interface EventOnlinePlatformRawFormData {
  platformName: string;
  title: string;
  url: string;
  description: string;
}

export class EventOnlinePlatformExtraDto {
  text?: string;
  video_url?: string;
  link_title?: string;
  link_url?: string;

  constructor(formValue: EventOnlinePlatformRawExtraFormData) {
    this.text = formValue.eventText;
    this.video_url = formValue.eventVideo;
    this.link_title = formValue.eventLinkTitle;
    this.link_url = formValue.eventUrl;
  }
}

export interface EventOnlinePlatformRawExtraFormData {
  eventText?: string;
  eventVideo?: string;
  eventLinkTitle?: string;
  eventUrl?: string;
}

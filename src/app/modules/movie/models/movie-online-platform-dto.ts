export class MovieOnlinePlatformDto {
  platform_name: string;
  title: string;
  platform_url: string;
  description: string;

  constructor(formValue: MovieOnlinePlatformRawFormData) {
    this.platform_name = formValue.platformName;
    this.title = formValue.title;
    this.platform_url = formValue.url;
    this.description = formValue.description;
  }
}


export interface MovieOnlinePlatformRawFormData {
  platformName: string;
  title: string;
  url: string;
  description: string;
}

export class MovieOnlinePlatformExtraDto {
  text?: string;
  video_url?: string;
  link_title?: string;
  link_url?: string;

  constructor(formValue: MovieOnlinePlatformRawExtraFormData) {
    this.text = formValue.movieText;
    this.video_url = formValue.movieVideo;
    this.link_title = formValue.movieLinkTitle;
    this.link_url = formValue.movieUrl;
  }
}

export interface MovieOnlinePlatformRawExtraFormData {
  movieText?: string;
  movieVideo?: string;
  movieLinkTitle?: string;
  movieUrl?: string;
}

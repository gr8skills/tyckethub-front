export interface CountryDto {
  id: number;
  name: string;
  calling_code: string;
  latlng: any;
  is_covered: number;
  alpha_2_code: string;
  alpha_3_code: string;
}

export class Country {
  alphaCode2: string;
  alphaCode3: string;
  callingCode: string;
  flag?: string;
  name: string;

  constructor(payload: CountryDto) {
    this.alphaCode2 = payload.alpha_2_code;
    this.alphaCode3 = payload.alpha_3_code;
    this.callingCode = payload.calling_code;
    this.name = payload.name;
  }
}

import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: false,
  backendPath: 'https://server-tyckethub.justusali.me',
  apiBaseUrl: 'https://server-tyckethub.justusali.me/api',
  apiExternalUrl: 'https://restcountries.eu/rest/v2/name/',
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  },
};

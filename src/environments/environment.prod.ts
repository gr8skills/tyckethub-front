import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: true,
  backendPath: 'https://admintyckethub.com',
  apiBaseUrl: 'https://admintyckethub.com/api',
  apiExternalUrl: 'https://restcountries.eu/rest/v2/name/',
  httpOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  },
};

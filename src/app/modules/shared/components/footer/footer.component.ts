import {Component, OnInit} from '@angular/core';
import {COUNTRIES} from '../../data';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {combineLatest} from 'rxjs';
import {CountryService} from '../../apis/country.service';
import {Country, CountryDto} from '../../models/country.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  apiUrl = environment.apiExternalUrl;

  countriesWithFlag: any[] = [];
  public countries: Country[] = [];

  constructor(private httpClient: HttpClient,
              private countryService: CountryService) {
    countryService.getActiveCountries().subscribe(
      countryData => {
        countryData.data.forEach((country: CountryDto) => this.countries.push(new Country(country)));
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.fetchCountryFlag();
  }

  fetchCountryFlag(): void {
    if (this.countries) {
      this.countries.forEach(c => {
        this.countryService.fetchCountryFlag(c.name).subscribe(
          flag => {
            c.flag = flag.data;
            this.countriesWithFlag.push(c);
          },
          error => console.log(error)
        );
      });
    }
  }
}

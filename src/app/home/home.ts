import { CommonModule } from '@angular/common';
import {Component, inject} from '@angular/core';
import {HousingLocation} from '../housing-location/housing-location';
import {HousingLocationInfo} from '../housinglocation';
import {Housing} from '../housing';
@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location 
        *ngFor="let housingLocation of filteredLocationList" 
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class Home {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  housingLocationList: HousingLocationInfo[] = [];
  housing: Housing = inject(Housing);
  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {
    this.housingLocationList = this.housing.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}

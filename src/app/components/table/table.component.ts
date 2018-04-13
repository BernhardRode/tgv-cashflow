import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import Booking from '../../models/Booking';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, OnChanges {
  @Input() bookings: Array<Booking | any>;

  START_YEAR = 2000;
  END_YEAR = new Date().getFullYear();
  years = [];
  months = Array.from({ length: 12 }, (x, i) => i);
  sections = environment.sections;
  monthNames = environment.monthNames;

  constructor() {
    this.years = Array.from({ length: 1 + this.END_YEAR - this.START_YEAR }, (x, i) => i);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const { bookings } = changes;
    if (!bookings.firstChange) {
      this.bookings = bookings.currentValue !== null ? bookings.currentValue : [];
    }
  }

  ngOnDestroy() {}

  sumSectionYear(section, year) {
    return 1;
  }

  sumSectionMonth(section, year, month) {
    return 2;
  }

  sumSubsectionYear(section, subsection, year) {
    return 3;
  }

  sumSubsectionMonth(section, subsection, year, month) {
    return 4;
  }
}

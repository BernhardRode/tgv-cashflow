import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import Booking from '../../models/Booking';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  START_YEAR = 2000;
  END_YEAR = new Date().getFullYear();
  SECTIONS = [
    {
      name: 'Einnahmen fix',
      subsections: [
        'Mitgliedsbeiträge',
        'Abteilungsbeiträge',
        'Kurse, FFZ',
        'Beiträge Arbeitsstd., Verzehrbons',
        'WLSB ÜL-Zuschuss',
        'Zuschuss Stadt Betriebskosten',
        'Jugendzuschuss, Koop TGV-HCG u.Ä.',
        'Pacht',
        'Nebenkosten',
        'Miete Vereinszimmer'
      ]
    },
    {
      name: 'Einnahmen variabel',
      subsections: [
        'Geldspenden',
        'Steuerrückzahlung',
        'Bottwartalmarathon',
        'Forderungen von HV an Abt.',
        'Sonstige Einnahmen'
      ]
    },
    {
      name: 'Ausgaben fix',
      subsections: [
        'Personalkosten',
        'Berufsgenossenschaft',
        'Abteilungsbeiträge',
        'Sportstättennutzung',
        'WLSB, STB',
        'Tilgung, Zinsen Darlehen',
        'Strom, Wasser, Gas',
        'Versicherungen',
        'Steuer (Vorauszahlung)',
        'Tennisvereinsheim',
        'Kopierer, Abos',
        'Jahresfeier',
        'Steuerberater'
      ]
    },
    {
      name: 'Ausgaben variabel',
      subsections: [
        'Personalkosten',
        'Berufsgenossenschaft',
        'Abteilungsbeiträge',
        'Sportstättennutzung',
        'WLSB, STB',
        'Tilgung, Zinsen Darlehen',
        'Strom, Wasser, Gas',
        'Versicherungen',
        'Steuer (Vorauszahlung)',
        'Tennisvereinsheim',
        'Kopierer, Abos',
        'Jahresfeier',
        'Steuerberater'
      ]
    }
  ];
  years = [];
  months = Array.from({ length: 12 }, (x, i) => i);
  monthNames = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ];

  bookings: Observable<any[]>;
  bookings$;

  constructor(private afs: AngularFirestore) {
    this.years = Array.from({ length: 1 + this.END_YEAR - this.START_YEAR }, (x, i) => i);
  }

  ngOnInit() {
    // const collection: AngularFirestoreCollection<Booking> = this.afs.collection('bookings');
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

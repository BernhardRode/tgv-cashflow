// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCzHJ0HqqzG6QUp0OYoNgUMI-Hh3ygNjDc',
    authDomain: 'tgv-cashflow.firebaseapp.com',
    databaseURL: 'https://tgv-cashflow.firebaseio.com',
    projectId: 'tgv-cashflow',
    storageBucket: 'tgv-cashflow.appspot.com',
    messagingSenderId: '84350516105'
  },
  sections: [
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
  ]
};

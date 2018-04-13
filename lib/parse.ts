import { isUndefined, isNullOrUndefined } from 'util';

const XLSX = require('xlsx');
const workbook = XLSX.readFile('data/2018_02_28_Cashflow HV.xlsx');

const MONTHS_DE = [
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

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const rowsSections = ['Einnahmen fix', 'Einnahmen variabel', 'Ausgaben fix', 'Ausgaben variabel'];

const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
const COLUMNS = [...ALPHABET];
ALPHABET.slice(0, 7).forEach(fl => ALPHABET.forEach(sl => COLUMNS.push(fl + sl)));

const ROWS = Array.apply(null, Array(200)).map((_, i) => i);

function createComment(comment) {
  return {
    author: comment.a.trim(),
    text: comment.t
      .replace(/[\u0000]/g, '')
      .replace(/[\u0000ÿÿ]/g, '')
      .replace(/[\u0001]/g, '')
      .replace(/[\u0002]/g, '')
      .replace(/[\u0003T]/g, '')
      .replace(/[\u0007]/g, '')
      .replace(/[\u000b;]/g, '')
      .replace(/[\u000b=]/g, '')
      .replace(/[\u000fW#]/g, '')
      // .replace(/[\u0010]/g, '')
      // .replace(/[\u0011]/g, '')
      // .replace(/[\u0012L]/g, '')
      // .replace(/[\u0013]/g, '')
      // .replace(/[\u0014]/g, '')
      // .replace(/[\u0015]/g, '')
      // .replace(/[\u0016]/g, '')
      // .replace(/[\u0019]/g, '')
      // .replace(/[\u001a]/g, '')
      // .replace(/[\u001b]/g, '')
      // .replace(/[\u001c]/g, '')
      // .replace(/[\u001due]/g, '')
      // .replace(/[\u001e]/g, '')
      // .replace(/[\u001f]/g, '')
      // .replace(/[\b]/g, '')
      // .replace(/[\n]/g, ' - ')
      // .replace(/[\r]/g, '')
      // .replace(/[\\r]/g, '')
      .replace(`${comment.a.trim()}:\n`, '')
      .replace(`${comment.a.trim().toLowerCase()}:\n`, '')
      .trim()
  };
}

function cout(d) {
  console.log('>>', d);
  return d;
}

function doProduct(textInput) {
  return textInput.indexOf('*') === -1
    ? textInput
    : textInput
        .split('*')
        .map(parseFloat)
        .reduce((a, b) => a * b, 1);
}

function explodeFormula(raw) {
  if (!raw) {
    return [];
  }

  return raw.f
    ? raw.f
        .replace('=', '')
        // .replace(/\./g, '')
        .replace(/,/g, '.')
        .replace(/-/g, '+-')
        .split('+')
        .filter(filter => filter.search('SUM') < 0)
        .map(doProduct)
        .map(parseFloat)
    : [raw.w ? raw.w.replace(',', '') : undefined].map(parseFloat);
}

class Cell {
  private raw;

  constructor(data) {
    this.raw = data;
  }

  getText() {
    if (this.raw && (this.raw.t === 's' || this.raw.t === 'n')) {
      return this.raw.w;
    }
    return '';
  }

  getValues() {
    return explodeFormula(this.raw);
  }

  getComments() {
    return this.raw && this.raw.c ? this.raw.c.map(createComment) : [];
  }
}

function main(columns, rows) {
  let bookings = [];

  let yearRow;
  let monthRow;
  let sumRow;

  let year;

  const categories = {};

  for (const column of columns) {
    let addColumn = true;
    let section = null;
    let category = null;

    let month = null;
    const day = 1;

    for (const row of rows) {
      const cellId = `${column}${row}`;

      if (workbook.Sheets.Detail[cellId]) {
        const cell = new Cell(workbook.Sheets.Detail[cellId]);

        if (column === 'A') {
          if (cell.getText().indexOf('Girokonto') === 0) {
            yearRow = row;
            monthRow = row + 1;
          }
          if (cell.getText().indexOf('Kontostand') === 0) {
            sumRow = row;
          }

          if (rowsSections.indexOf(cell.getText()) !== -1) {
            section = cell.getText();
          } else if (cell.getText().indexOf('Summen') === 0) {
            section = null;
          } else {
            if (section !== null) {
              category = cell.getText();
              categories[row] = {
                category,
                section
              };
            }
          }
        } else {
          if (row === yearRow) {
            if (cell.getText().indexOf('Jahr') === 0) {
              year = parseInt(cell.getText().replace('Jahr ', ''), 10);
              addColumn = false;
            }
          }
          if (row === monthRow) {
            month =
              MONTHS_DE.indexOf(cell.getText()) > -1
                ? MONTHS_DE.indexOf(cell.getText())
                : MONTHS_EN.indexOf(cell.getText());
          }
          if (categories[row] && addColumn) {
            const comments = cell.getComments();

            const _bookings = cell
              .getValues()
              .map(value => ({ ...categories[row], year, month, day, comments, value }));

            const sum = _bookings.map(booking => booking.value).reduce((a, b) => a + b, 0);
            const checksum = parseFloat(cell.getText().replace(',', ''));

            if (-0.001 < checksum - sum && checksum - sum > 0.001) {
              throw new Error(`Cell values do not meet our sum: ${cellId}`);
            }
            if (cellId === 'CG39') {
              if (sum !== 2500) {
                throw new Error('Values are wrong.');
              }
            }
            if (['BO60', 'CB15', 'BZ17'].indexOf(cellId) !== -1) {
              throw new Error(`Cell should not have been checked. ${cellId}`);
            }

            bookings = [...bookings, ..._bookings];
          }
        }
      }
    }
  }

  return bookings;
}

function toCSV(booking) {
  return `"${booking.year}"; "${booking.month}"; "${booking.day}"; "${booking.section}"; "${booking.category}"; "${
    booking.value
  }"`;
}

const bookings = main(COLUMNS, ROWS);

export default bookings;

// const input = '−10+27420−33−33−33−33−123+60−50+60+97−33+50−50−50+140+20';
// const result = 27399;

// const test = explodeFormula({ f: input }).reduce((a, b) => a + b, 0);

// console.log(test === result);

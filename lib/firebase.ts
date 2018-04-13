const Firestore = require('@google-cloud/firestore');
const { environment } = require('../src/environments/environment');
import Bookings from './parse';
const { firebase } = environment;

async function store(bookings) {
  const firestore = new Firestore({
    projectId: firebase.projectId,
    keyFilename: 'lib/tgv-cashflow.serviceaccount.json'
  });

  const collection = firestore.collection('bookings');

  const promises = bookings.map(booking => collection.add(booking));

  await Promise.all(promises);
}

store(Bookings);

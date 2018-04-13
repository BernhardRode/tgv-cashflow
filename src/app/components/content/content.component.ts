import { Component, Input, OnInit } from '@angular/core';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import Booking from '../../models/Booking';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  private bookingsCollection: AngularFirestoreCollection<Booking>;
  booking;
  bookings: Observable<Booking[]>;
  counter = 0;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.bookingsCollection = afs.collection<Booking>('bookings');
    this.bookings = this.bookingsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Booking;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    const today = new Date();

    this.booking = {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
      category: '',
      section: '',
      value: 0
    };
  }

  ngOnInit(): void {}

  add(): void {
    const width = '700px';
    const height = '500px';
    const data = { ...this.booking };
    const dialogRef = this.dialog.open(AddDialogComponent, { width, height, data });

    dialogRef.afterClosed().subscribe(result => {
      this.booking = result;
      this.addBooking(result);
    });
  }

  remove(booking: Booking): void {
    this.removeBooking(booking);
  }

  private addBooking(booking: Booking) {
    this.bookingsCollection.add(booking);
  }

  private removeBooking(booking: Booking): void {
    this.bookingsCollection.doc(booking.id).delete();
  }
}

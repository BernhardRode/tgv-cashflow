import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

import { environment } from '../../../environments/environment';
import Booking from '../../models/Booking';

@Component({
  selector: 'app-add-dialog',
  templateUrl: 'add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {
  sections = environment.sections;
  subsections = [];

  addDialogForm: FormGroup;
  sectionSelected$;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  createForm() {
    this.addDialogForm = this.fb.group({
      section: this.data.section,
      category: this.data.category,
      date: new Date(this.data.year, this.data.month, this.data.day),
      comment: ''
    });

    this.sectionSelected$ = this.addDialogForm.controls['section'].valueChanges.subscribe(selectedSection => {
      this.subsections = this.sections.filter(s => s.name === selectedSection)[0].subsections;
    });
  }

  onSubmit() {
    this.data = this.prepareSave();
    console.log(this.data);
    // this.dialogRef.close(this.data);
  }

  prepareSave(): Booking {
    const formModel = this.addDialogForm.value;

    const booking: Booking = {
      category: formModel.category as string,
      section: formModel.section as string,
      year: formModel.date.getFullYear(),
      month: formModel.date.getMonth(),
      day: formModel.date.getDay()
    };

    if (formModel.comment !== '') {
      booking.comments = [
        {
          author: 'TODO AUTHOR',
          comment: formModel.comment as string,
          timeCreated: new Date()
        }
      ];
    }

    return booking;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

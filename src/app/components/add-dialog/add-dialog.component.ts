import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from '../../../environments/environment';
import Booking from '../../models/Booking';
import Comment from '../../models/Comment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-dialog',
  templateUrl: 'add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit, OnDestroy {
  sections = environment.sections;
  subsections = [];

  addDialogForm: FormGroup;
  sectionSelected$: Subscription;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.createForm();

    this.sectionSelected$ = this.addDialogForm.controls['section'].valueChanges.subscribe(selectedSection => {
      this.subsections = this.getSubsections(selectedSection);
    });
  }

  ngOnDestroy() {
    this.sectionSelected$.unsubscribe();
  }

  createForm() {
    const date = new Date(this.data.year, this.data.month, this.data.day, 9, 0, 0);
    this.addDialogForm = this.fb.group({
      section: [this.data.section, Validators.required],
      category: [{ value: this.data.category, disabled: this.data.category === '' }, Validators.required],
      date: [date, Validators.required],
      comment: '',
      value: ['', Validators.required]
    });
    if (this.data.section !== '') {
      this.subsections = this.getSubsections(this.data.section);
    }
  }

  onChangeSection({ value }) {
    value && value !== ''
      ? this.addDialogForm.controls.category.enable()
      : this.addDialogForm.controls.category.disable();
  }

  onSubmit() {
    this.data = this.prepareSave();
    this.dialogRef.close(this.data);
  }

  getSubsections(selectedSection: String) {
    return this.sections.filter(s => s.name === selectedSection)[0].subsections;
  }

  prepareSave(): Booking {
    const formModel = this.addDialogForm.value;
    const booking: Booking = {
      category: formModel.category as string,
      section: formModel.section as string,
      year: formModel.date.getFullYear(),
      month: formModel.date.getMonth(),
      day: formModel.date.getDay(),
      value: formModel.value
    };

    if (formModel.comment !== '') {
      const comment: Comment = {
        author: this.afAuth.auth.currentUser.email,
        comment: formModel.comment as string,
        timeCreated: new Date()
      };

      booking.comments = [comment];
    }

    return booking;
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

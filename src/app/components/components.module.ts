import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [AddDialogComponent, LoginComponent, TableComponent, HeaderComponent, ContentComponent],
  exports: [AddDialogComponent, LoginComponent, TableComponent, HeaderComponent, ContentComponent],
  entryComponents: [AddDialogComponent]
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './pages/detail/detail.component';
import {MatCardModule} from '@angular/material/card';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    StudentsComponent,
    CreateUpdateComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    SharedModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCardModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }

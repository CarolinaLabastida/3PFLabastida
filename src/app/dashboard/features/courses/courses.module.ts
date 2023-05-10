import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { DetailComponent } from './pages/detail/detail.component';
import {MatCardModule} from '@angular/material/card';
import { CoursesRoutingModule } from './courses-routing.module';


@NgModule({
  declarations: [
    CoursesComponent,
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
    SharedModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }

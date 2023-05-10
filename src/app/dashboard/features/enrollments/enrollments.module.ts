import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsComponent } from './enrollments.component';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './pages/detail/detail.component';
import {MatCardModule} from '@angular/material/card';
import { EnrollmentsRoutingModule } from './enrollments.routing.module';

@NgModule({
  declarations: [
    EnrollmentsComponent,
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
    SharedModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    EnrollmentsRoutingModule
  ]
})
export class EnrollmentsModule { }

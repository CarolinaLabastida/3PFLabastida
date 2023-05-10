import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagesPipe } from './pipes/control-error-messages.pipe';
import { FontSizeDirective } from './directives/font-size.directive';
import { DescriptionsPipe } from './pipes/descriptions.pipe';



@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    FontSizeDirective,
    DescriptionsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    FontSizeDirective,
    DescriptionsPipe
  ]
})
export class SharedModule { }

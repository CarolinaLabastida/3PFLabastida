import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { ControlErrorMessagesPipe } from './pipes/control-error-messages.pipe';
import { FontSizeDirective } from './directives/font-size.directive';
import { ActivatedRoutePipe } from './pipes/activated-route.pipe';



@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    FontSizeDirective,
    ActivatedRoutePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullNamePipe,
    ControlErrorMessagesPipe,
    FontSizeDirective,
    ActivatedRoutePipe
  ]
})
export class SharedModule { }

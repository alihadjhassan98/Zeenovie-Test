import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePipe } from './date-range.pipe';



@NgModule({
  declarations: [
    DateRangePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DateRangePipe
  ]
})
export class SharedPipeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';

@NgModule({
  declarations: [
    PaginationComponent,
    ConfirmationBoxComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents:[ConfirmationBoxComponent],
  exports:[PaginationComponent, ConfirmationBoxComponent]
})
export class SharedModule { }

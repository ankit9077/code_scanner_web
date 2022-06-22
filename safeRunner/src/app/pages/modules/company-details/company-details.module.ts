import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { EmployeeComponent } from './components/employee/employee.component';
import { VehicleEditorComponent } from './components/vehicle-editor/vehicle-editor.component';



@NgModule({
  declarations: [
    VehicleComponent,
    EmployeeComponent,
    VehicleEditorComponent
  ],
  imports: [
    CommonModule,
    CompanyDetailsRoutingModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    VehicleEditorComponent
  ]
})
export class CompanyDetailsModule { }

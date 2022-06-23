import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { CompanyDetailsRoutingModule } from './company-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { EmployeeComponent } from './components/employee/employee.component';
import { VehicleEditorComponent } from './components/vehicle-editor/vehicle-editor.component';
import { QrCodesComponent } from './components/qr-codes/qr-codes.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ViewQrcodeComponent } from './components/qr-codes/view-qrcode/view-qrcode.component';

@NgModule({
  declarations: [
    VehicleComponent,
    EmployeeComponent,
    VehicleEditorComponent,
    QrCodesComponent,
    ViewQrcodeComponent
  ],
  imports: [
    CommonModule,
    CompanyDetailsRoutingModule,
    MatDialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  entryComponents: [
    VehicleEditorComponent,
    QrCodesComponent,
    ViewQrcodeComponent
  ]
})
export class CompanyDetailsModule { }

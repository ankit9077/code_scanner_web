import { CompanyService } from './../../../../../services/company/company.service';
import { Company, Vehicle } from './../../../../../../assets/models';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-editor',
  templateUrl: './vehicle-editor.component.html',
  styleUrls: ['./vehicle-editor.component.scss']
})
export class VehicleEditorComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  @Input() isEditMode = false;

  get company(): Company {
    return this.companyService.company;
  }
  isLoading =false;
  isInitialLoading = false;
  errorMessage = '';
  constructor(private companyService: CompanyService,
    private dialogRef: MatDialogRef<VehicleEditorComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(vehicle = null): void {
    this.dialogRef.close(vehicle);
  }

  CreateUpdateVehicle() {

  }

}

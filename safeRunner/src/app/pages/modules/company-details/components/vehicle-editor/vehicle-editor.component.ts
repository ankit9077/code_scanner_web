import { VehicleService } from './../../../../../services/vehicle/vehicle.service';
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
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<VehicleEditorComponent>) { }

  ngOnInit(): void {
    if(!this.isEditMode){
      this.vehicle = new Vehicle();
    }
  }

  CloseDialog(vehicle = null): void {
    this.dialogRef.close(vehicle);
  }

  CreateUpdateVehicle() {
    if (this.CheckFormValidation()) {
      this.vehicle.plateNumber = this.vehicle.plateNumber.trim();
      this.vehicle.name = this.vehicle.name.trim();
      this.isLoading = true;
      if (!this.isEditMode) {
        this.vehicleService.CreateVehicle(this.vehicle).then((response) => {
          this.CloseDialog(response);
        },(err)=>{
          this.errorMessage = err;
        }).finally(() => {
          this.isLoading = false;
        });
      } else {
        this.vehicleService.UpdateVehicle(this.vehicle).then((response) => {
          this.CloseDialog(response);
        },(err)=>{
          this.errorMessage = err;
        }).finally(() => {
          this.isLoading = false;
        });
      }
    }
  }

  CheckFormValidation(): boolean {
    this.errorMessage = '';
    if (!this.vehicle.name.trim().length || !this.vehicle.plateNumber.trim().length) {
      this.errorMessage = 'Please fill all the fields';
    }
    return this.errorMessage.length === 0;
  }

}

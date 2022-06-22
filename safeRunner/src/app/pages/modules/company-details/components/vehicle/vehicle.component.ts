import { VehicleEditorComponent } from './../vehicle-editor/vehicle-editor.component';
import { Vehicle } from './../../../../../../assets/models';
import { ActivatedRoute, Params } from '@angular/router';
import { VehicleService } from './../../../../../services/vehicle/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  isLoading = false;
  get Vehicles(): Array<Vehicle>{
    return this.vehicleService.vehicles;
  }

  constructor(private vehicleService: VehicleService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.GetVehicleListByCompanyId().then((response)=>{
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
    });
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

  AddNewVehicle() {
    const vehicleEditorInstance = this.matDialog.open(VehicleEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    vehicleEditorInstance.componentInstance.isEditMode = false;
  }

}

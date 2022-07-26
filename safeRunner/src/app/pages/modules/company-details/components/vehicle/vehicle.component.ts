import { PAGE_SIZE } from './../../../../../../assets/constants';
import { QrCodesComponent } from './../qr-codes/qr-codes.component';
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
    this.vehicleService.GetVehicleListByCompanyId(0,PAGE_SIZE).then((response)=>{
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
    vehicleEditorInstance.afterClosed().subscribe((vehicle)=>{
      if(vehicle){
        this.vehicleService.vehicles.unshift(vehicle);
      }
    });
  }

  EditVehicle(vehicle: Vehicle, index: number) {
    const vehicleEditorInstance = this.matDialog.open(VehicleEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    vehicleEditorInstance.componentInstance.isEditMode = true;
    vehicleEditorInstance.componentInstance.vehicle = JSON.parse(JSON.stringify(vehicle));
    vehicleEditorInstance.afterClosed().subscribe((vehicle)=>{
      if(vehicle) {
        this.vehicleService.vehicles[index] = vehicle;
      }
    });
  }

  openQrCodes(vehicle: Vehicle, index: number) {
    const qrCodesInstance = this.matDialog.open(QrCodesComponent, {
      height: '100vh',
      width: '100vw',
    });
    qrCodesInstance.componentInstance.vehicle = JSON.parse(JSON.stringify(vehicle));
    qrCodesInstance.afterClosed().subscribe((vehicle)=>{
      if(vehicle) {
        this.vehicleService.vehicles[index] = vehicle;
      }
    });
  }

}

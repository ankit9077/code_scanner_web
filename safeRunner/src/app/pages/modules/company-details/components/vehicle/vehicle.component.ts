import { PAGE_SIZE } from './../../../../../../assets/constants';
import { QrCodesComponent } from './../qr-codes/qr-codes.component';
import { VehicleEditorComponent } from './../vehicle-editor/vehicle-editor.component';
import { Vehicle } from './../../../../../../assets/models';
import { ActivatedRoute, Params } from '@angular/router';
import { VehicleService } from './../../../../../services/vehicle/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ConfirmationBoxComponent } from 'src/app/shared-module/components/confirmation-box/confirmation-box.component';
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
  pageIndex = 0;
  totalCount = 0;
  searchText = '';

  constructor(private vehicleService: VehicleService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.GetVehicleList();
  }

  GetVehicleList(){
    this.isLoading = true;
    this.vehicleService.GetVehicleListByCompanyId(this.pageIndex,PAGE_SIZE, this.searchText).then((response)=>{
      this.totalCount = response.totalCount;
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
    });
  }

  onIndexChange(value: number){
    this.pageIndex = value;
    this.GetVehicleList();
  }

  onSearched(){
    this.pageIndex = 0;
    this.GetVehicleList();
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

  OpenConfirmBoxForDelete(vehicle: Vehicle, index: number){
    const confirmationBoxInstance = this.matDialog.open(ConfirmationBoxComponent, {
      height: '200px',
      width: '400px',
    });
    confirmationBoxInstance.componentInstance.alertConfig={
      header:`Delete Vehicle`,
      title:`Are you sure you want to delete "${vehicle.name}"?`,
      warning:``,
      buttons:{confirm:'Delete',cancel:'Cancel'}
    };
    confirmationBoxInstance.beforeClosed().subscribe((res)=>{
      if(res){
        this.isLoading = true;
        this.vehicleService.DeleteVehicleById(vehicle.guid).then((res)=>{
          this.isLoading = false;
          if(this.vehicleService.vehicles.length>=1){
            this.vehicleService.vehicles.splice(index,1);
            this.totalCount--;
          }
          if(this.vehicleService.vehicles.length===0 && this.totalCount>0){
            this.pageIndex = 0;
            this.GetVehicleList();
          }
        },(err)=>{
          this.isLoading = false;
        });
      }
    })
  }

}

import { Vehicle } from './../../../../../../assets/models';
import { ActivatedRoute, Params } from '@angular/router';
import { VehicleService } from './../../../../../services/vehicle/vehicle.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.vehicleService.GetVehicleListByCompanyId().then((response)=>{
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
    });
  }

}

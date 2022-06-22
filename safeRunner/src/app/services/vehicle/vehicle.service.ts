import { Vehicle } from './../../../assets/models';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = '/vehicle';
  vehicles: Array<Vehicle> = [];
  companyGuid: String = '';

  constructor(private httpService: HttpService) { }

  public GetVehicleListByCompanyId(): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.httpService.Get(this.baseUrl+'/list/'+this.companyGuid).subscribe((response: any)=>{
        this.vehicles = response.result;
        resolve(response.result);
      },(err)=>{
        reject(err.message);
      });
    });
  }
}

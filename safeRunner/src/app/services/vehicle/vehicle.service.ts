import { Vehicle, QrCodes } from './../../../assets/models';
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

  public GetVehicleListByCompanyId(pageIndex: number, pageSize: number): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.httpService.Get(this.baseUrl+'/list/'+this.companyGuid+`?index=${pageIndex}&size=${pageSize}`).subscribe((response: any)=>{
        this.vehicles = response.result;
        resolve(response);
      },(err)=>{
        reject(err.message);
      });
    });
  }

  public CreateVehicle(vehicle: Vehicle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/create/'+this.companyGuid, vehicle).subscribe((response: any) => {
        if (response.statusCode === 201) {
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.message));
    });
  }

  public UpdateVehicle(vehicle: Vehicle): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update/'+this.companyGuid, vehicle).subscribe((response: any) => {
        if (response.statusCode === 200) {
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.message));
    });
  }


  public UpdateQrCodes(qrCodes: Array<QrCodes>, vehicleId: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/saveCodes/'+ vehicleId, {qrCodes: qrCodes}).subscribe((response: any) => {
        if (response.statusCode === 200) {
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.message));
    });
  }
}

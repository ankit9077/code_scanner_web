import { Company } from './../../../assets/models';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = '/company';
  companies: Array<Company> = [];

  constructor(private httpService: HttpService) { }

  public GetCompanyList(): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.httpService.Get(this.baseUrl+'/list').subscribe((response: any)=>{
        this.companies = response.result;
        resolve(response.result);
      },(err)=>{
        reject(err.message);
      });
    });
  }
}

import { ToastService } from './../toast/toast.service';
import { Company } from './../../../assets/models';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = '/company';
  companies: Array<Company> = [];
  company!: Company;

  constructor(private httpService: HttpService, private toastService: ToastService) { }

  public GetCompanyList(pageIndex: number, pageSize: number): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.httpService.Get(this.baseUrl+`/list?index=${pageIndex}&size=${pageSize}`).subscribe((response: any)=>{
        this.companies = response.result;
        resolve(response);
      },(err)=>{
        reject(err.error.message);
      });
    });
  }

  public GetCompanyById(id: String): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.httpService.Get(this.baseUrl+`/${id}`).subscribe((response: any)=>{
        this.company = response.result;
        resolve(response.result);
      },(err)=>{
        reject(err.error.message);
      });
    });
  }

  public CreateCompany(company: Company): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/create', company).subscribe((response: any) => {
        if (response.statusCode === 201) {
          this.toastService.success(response.message);
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.error.message));
    });
  }

  public UpdateCompany(company: Company): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update', company).subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.toastService.success(response.message);
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.error.message));
    });
  }

  public DeleteCompanyById(companyguid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Delete(this.baseUrl + '/delete/' + companyguid).subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.toastService.success(response.message);
          resolve(response.result);
        } else {
          this.toastService.error(response.message);
          reject(response.message);
        }
      }, err => reject(err.error.message));
    });
  }
}

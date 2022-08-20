import { ToastService } from './../toast/toast.service';
import { Employee } from './../../../assets/models';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = '/employee';
  employees: Array<Employee> = [];
  companyGuid: String = '';

  constructor(private httpService: HttpService, private toastService: ToastService) { }

  public GetEmployeeListByCompanyId(pageIndex: number, pageSize: number, searchText: string): Promise<any> {
    return new Promise((resolve, reject)=>{
      this.httpService.Get(this.baseUrl+'/list/'+this.companyGuid+`?index=${pageIndex}&size=${pageSize}&search=${searchText}`).subscribe((response: any)=>{
        this.employees = response.result;
        resolve(response);
      },(err)=>{
        reject(err.error.message);
      });
    });
  }

  public CreateEmployee(employee: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/create/'+this.companyGuid, employee).subscribe((response: any) => {
        if (response.statusCode === 201) {
          this.toastService.success(response.message);
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.error.message));
    });
  }

  public UpdateEmployee(employee: Employee): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Post(this.baseUrl + '/update/'+this.companyGuid, employee).subscribe((response: any) => {
        if (response.statusCode === 200) {
          this.toastService.success(response.message);
          resolve(response.result);
        } else {
          reject(response.message);
        }
      }, err => reject(err.error.message));
    });
  }

  public DeleteEmployeeById(employeeGuid: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.Delete(this.baseUrl + '/delete/' + employeeGuid).subscribe((response: any) => {
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

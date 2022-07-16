import { EmployeeService } from './../../../../../services/employee/employee.service';
import { Employee } from './../../../../../../assets/models';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  isLoading = false;
  get Employees(): Array<Employee>{
    return this.employeeService.employees;
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.GetEmployeeListByCompanyId().then((response)=>{
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
    });
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

}

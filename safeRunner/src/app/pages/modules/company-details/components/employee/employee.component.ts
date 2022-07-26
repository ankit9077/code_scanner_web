import { PAGE_SIZE } from './../../../../../../assets/constants';
import { EmployeeEditorComponent } from './employee-editor/employee-editor.component';
import { MatDialog } from '@angular/material';
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

  constructor(private employeeService: EmployeeService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.employeeService.GetEmployeeListByCompanyId(0, PAGE_SIZE).then((response)=>{
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
    });
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

  AddNewEmployee() {
    const employeeEditorInstance = this.matDialog.open(EmployeeEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    employeeEditorInstance.componentInstance.isEditMode = false;
    employeeEditorInstance.afterClosed().subscribe((employee)=>{
      if(employee){
        this.employeeService.employees.unshift(employee);
      }
    });
  }

  EditEmployee(employee: Employee, index: number) {
    const employeeEditorInstance = this.matDialog.open(EmployeeEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    employeeEditorInstance.componentInstance.isEditMode = true;
    employeeEditorInstance.componentInstance.employee = JSON.parse(JSON.stringify(employee));
    employeeEditorInstance.afterClosed().subscribe((employee)=>{
      if(employee) {
        this.employeeService.employees[index] = employee;
      }
    });
  }

}

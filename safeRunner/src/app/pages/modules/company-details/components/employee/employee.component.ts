import { PAGE_SIZE } from './../../../../../../assets/constants';
import { EmployeeEditorComponent } from './employee-editor/employee-editor.component';
import { MatDialog } from '@angular/material';
import { EmployeeService } from './../../../../../services/employee/employee.service';
import { Employee } from './../../../../../../assets/models';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationBoxComponent } from 'src/app/shared-module/components/confirmation-box/confirmation-box.component';
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
  pageIndex = 0;
  totalCount = 0;
  searchText = '';

  constructor(private employeeService: EmployeeService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.GetEmployeesList();
  }

  GetEmployeesList(){
    this.isLoading = true;
    this.employeeService.GetEmployeeListByCompanyId(this.pageIndex, PAGE_SIZE, this.searchText).then((response)=>{
      this.totalCount = response.totalCount;
      this.isLoading = false;
    },(err)=>{
      this.isLoading = false;
    });
  }

  onIndexChange(value: number){
    this.pageIndex = value;
    this.GetEmployeesList();
  }

  onSearched(){
    this.pageIndex = 0;
    this.GetEmployeesList();
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

  OpenConfirmBoxForDelete(employee: Employee, index: number){
    const confirmationBoxInstance = this.matDialog.open(ConfirmationBoxComponent, {
      height: '200px',
      width: '400px',
    });
    confirmationBoxInstance.componentInstance.alertConfig={
      header:`Delete Employee`,
      title:`Are you sure you want to delete "${employee.name}"?`,
      warning:``,
      buttons:{confirm:'Delete',cancel:'Cancel'}
    };
    confirmationBoxInstance.beforeClosed().subscribe((res)=>{
      if(res){
        this.isLoading = true;
        this.employeeService.DeleteEmployeeById(employee.guid).then((res)=>{
          this.isLoading = false;
          if(this.employeeService.employees.length>=1){
            this.employeeService.employees.splice(index,1);
            this.totalCount--;
          }
          if(this.employeeService.employees.length===0 && this.totalCount>0){
            this.pageIndex = 0;
            this.GetEmployeesList();
          }
        },(err)=>{
          this.isLoading = false;
        });
      }
    })
  }
}

import { emailRegex } from 'src/assets/constants';
import { EmployeeService } from './../../../../../../services/employee/employee.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company, Employee } from 'src/assets/models';

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.scss']
})
export class EmployeeEditorComponent implements OnInit {
  @Input() employee!: Employee;
  @Input() isEditMode = false;

  get company(): Company {
    return this.companyService.company;
  }
  isLoading =false;
  isInitialLoading = false;
  errorMessage = '';
  constructor(
    private companyService: CompanyService,
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeEditorComponent>) { }

  ngOnInit(): void {
    if(!this.isEditMode){
      this.employee = new Employee();
    }
  }

  CloseDialog(employee = null): void {
    this.dialogRef.close(employee);
  }

  CreateUpdateEmployee() {
    if (this.CheckFormValidation()) {
      this.employee.email = this.employee.email.trim();
      this.employee.name = this.employee.name.trim();
      this.isLoading = true;
      if (!this.isEditMode) {
        this.employeeService.CreateEmployee(this.employee).then((response) => {
          this.CloseDialog(response);
        },(err)=>{
          this.errorMessage = err;
        }).finally(() => {
          this.isLoading = false;
        });
      } else {
        this.employeeService.UpdateEmployee(this.employee).then((response) => {
          this.CloseDialog(response);
        },(err)=>{
          this.errorMessage = err;
        }).finally(() => {
          this.isLoading = false;
        });
      }
    }
  }

  CheckFormValidation(): boolean {
    this.errorMessage = '';
    if (!this.employee.name.trim().length || !this.employee.email.trim().length) {
      this.errorMessage = 'Please fill all the fields';
    }else if(!this.employee.email.match(emailRegex)){
      this.errorMessage = 'Enter a valid Email';
    }
    return this.errorMessage.length === 0;
  }


}

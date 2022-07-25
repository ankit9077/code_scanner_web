import { CompanyService } from './../../../../../services/company/company.service';
import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/assets/models';
import { MatDialogRef } from '@angular/material';
import { emailRegex } from 'src/assets/constants';

@Component({
  selector: 'app-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent implements OnInit {
  @Input() company!: Company;
  @Input() isEditMode = false;

  get companies(): Array<Company> {
    return this.companyService.companies;
  }
  isLoading =false;
  isInitialLoading = false;
  errorMessage = '';
  constructor(
    private companyService: CompanyService,
    private dialogRef: MatDialogRef<CompanyEditorComponent>) { }

  ngOnInit(): void {
    if(!this.isEditMode){
      this.company = new Company();
    }
  }

  CloseDialog(company = null): void {
    this.dialogRef.close(company);
  }

  CreateUpdateEmployee() {
    if (this.CheckFormValidation()) {
      this.company.email = this.company.email.trim();
      this.company.name = this.company.name.trim();
      this.isLoading = true;
      if (!this.isEditMode) {
        this.companyService.CreateCompany(this.company).then((response) => {
          this.CloseDialog(response);
        },(err)=>{
          this.errorMessage = err;
        }).finally(() => {
          this.isLoading = false;
        });
      } else {
        this.companyService.UpdateCompany(this.company).then((response) => {
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
    if (!this.company.name.trim().length || !this.company.email.trim().length) {
      this.errorMessage = 'Please fill all the fields';
    }else if(!this.company.email.match(emailRegex)){
      this.errorMessage = 'Enter a valid Email';
    }
    return this.errorMessage.length === 0;
  }

}

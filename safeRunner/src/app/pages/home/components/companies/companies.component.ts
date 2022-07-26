import { PAGE_SIZE } from './../../../../../assets/constants';
import { CompanyEditorComponent } from './company-editor/company-editor.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Company } from './../../../../../assets/models';
import { CompanyService } from './../../../../services/company/company.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  isloading = false;
  get Companies(): Array<Company>{
    return this.companyService.companies;
  }

  constructor(private companyService: CompanyService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.isloading = true;
    this.companyService.GetCompanyList(0, PAGE_SIZE).then((response)=>{
      this.isloading = false;
    },(err)=>{
      this.isloading = false;
    });
  }

  OpenCompanyDetails(id: String) {
    this.router.navigate([`home/company/${id}`]);
  }

  AddNewOrganization() {
    const companyEditorInstance = this.matDialog.open(CompanyEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    companyEditorInstance.componentInstance.isEditMode = false;
    companyEditorInstance.afterClosed().subscribe((res)=>{
      if(res){
        this.companyService.companies.unshift(res);
      }
    });
  }

  EditOrganization(company: Company, index: number) {
    const companyEditorInstance = this.matDialog.open(CompanyEditorComponent, {
      height: '100vh',
      width: '100vw',
    });
    companyEditorInstance.componentInstance.isEditMode = true;
    companyEditorInstance.componentInstance.company = JSON.parse(JSON.stringify(company));
    companyEditorInstance.afterClosed().subscribe((res)=>{
      if(res) {
        this.companyService.companies[index] = res;
      }
    });
  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

}

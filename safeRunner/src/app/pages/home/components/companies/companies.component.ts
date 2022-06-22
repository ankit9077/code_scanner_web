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

  constructor(private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.isloading = true;
    this.companyService.GetCompanyList().then((response)=>{
      this.isloading = false;
    },(err)=>{
      this.isloading = false;
    });
  }

  OpenCompanyDetails(id: String) {
    this.router.navigate([`home/company/${id}`]);
  }

  AddNewOrganization() {

  }

  GetMomentDate(date: Date): string {
    return moment(new Date(date)).format('lll');
  }

}

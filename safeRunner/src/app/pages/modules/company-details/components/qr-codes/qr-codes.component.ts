import { Vehicle, QrCodes } from './../../../../../../assets/models';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';
import * as uuid from "uuid";
import { ViewQrcodeComponent } from './view-qrcode/view-qrcode.component';

@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.scss']
})
export class QrCodesComponent implements OnInit {
  @Input() vehicle!: Vehicle;

  get QRCodes(): Array<QrCodes> {
    return this.vehicle.qrCodes;
  }
  set QRCodes(codes) {
    this.vehicle.qrCodes = codes
  }

  isLoading = false;
  errorMessage = '';

  constructor(private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<QrCodesComponent>,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  CloseDialog(vehicle = null): void {
    this.dialogRef.close(vehicle);
  }

  AddQRCodeAt(index: number){
    let qrCode = new QrCodes();
    qrCode.title = '';
    qrCode.codeInfo = uuid.v4();
    this.QRCodes.splice(index,0,JSON.parse(JSON.stringify(qrCode)));
  }

  RemoveQRCodeAt(index: number){
    this.QRCodes.splice(index,1);
  }

  CheckValidationForCodes(){
    let flag = true;
    this.QRCodes.forEach(element => {
      if(element.title.trim().length===0){
        flag = false;
      }
    });
    return flag;
  }

  SaveQrCodes(){
    if(this.CheckValidationForCodes()){
      this.isLoading = true;
      this.vehicleService.UpdateQrCodes(this.QRCodes,this.vehicle.guid).then((response)=>{
        response.qrCodes = this.QRCodes;
        this.dialogRef.close(response)
      },(err)=>{
        this.errorMessage = err;
      }).finally(()=>{
        this.isLoading = false;
      });
    }else{
      this.errorMessage = 'Enter all the fields'
    }
  }

  ViewQrCode(qrCode: QrCodes){
    const viewQrCodeInstance = this.matDialog.open(ViewQrcodeComponent, {
      height: '100vh',
      width: '70vw',
    });
    viewQrCodeInstance.componentInstance.codeData = (JSON.stringify({p:qrCode.codeInfo, v: this.vehicle.guid}));
    viewQrCodeInstance.componentInstance.title = qrCode.title;
    viewQrCodeInstance.componentInstance.plateNumber = this.vehicle.plateNumber;
  }

}

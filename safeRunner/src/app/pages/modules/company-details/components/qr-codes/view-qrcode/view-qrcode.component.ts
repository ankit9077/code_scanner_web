
import { MatDialogRef } from '@angular/material';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-view-qrcode',
  templateUrl: './view-qrcode.component.html',
  styleUrls: ['./view-qrcode.component.scss']
})
export class ViewQrcodeComponent implements OnInit {
@Input() codeData = '';
@Input() title: String = '';
@ViewChild('parent') qrCode!: QRCodeComponent;
  constructor(private dialogRef: MatDialogRef<ViewQrcodeComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

  saveAsImage(parent: any) {
    debugger;
    const parentElement = parent.qrcElement.nativeElement.querySelector("img").src;

    let blobData = this.convertBase64ToBlob(parentElement);

    const blob = new Blob([blobData], { type: "image/png" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Qrcode';
    link.click();

  }

  private convertBase64ToBlob(Base64Image: any) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }

}

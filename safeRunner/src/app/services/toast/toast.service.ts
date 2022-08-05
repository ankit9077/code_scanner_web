import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  success(message: string){
    this.snackBar.open(message,'×',{
      duration: 3000,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }


  error(message: string){
    this.snackBar.open(message,'×',{
      duration: 3000,
      panelClass: ['snackbar-danger'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}

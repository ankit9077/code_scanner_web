import { PAGE_SIZE } from './../../../../assets/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
@Input() totalCount = 0;
@Input() selectedIndex = 0;
@Output() indexOnChange = new EventEmitter<number>();

pageSize = PAGE_SIZE;

get indexOptions(): Array<number>{
  const arr = [];
  for(let i=0;i<this.totalCount/PAGE_SIZE;i++){
    arr.push(i)
  }
  return arr;
}
  constructor() { }

  ngOnInit(): void {
  }

  ChangePageIndex(value: number) {
    if(this.selectedIndex!==value && value>=0 &&
      value<=this.indexOptions[this.indexOptions.length-1]){
      this.selectedIndex = value;
      this.indexOnChange.emit(value);
    }
  }

}

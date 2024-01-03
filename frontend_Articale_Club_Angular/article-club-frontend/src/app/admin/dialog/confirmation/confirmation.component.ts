// import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ThemeService } from '../../../services/theme.service';

// @Component({
//   selector: 'app-confirmation',
//   templateUrl: './confirmation.component.html',
//   styleUrl: './confirmation.component.scss'
// })
// export class ConfirmationComponent implements OnInit {
  
//   onEmitsStatusChange=new EventEmitter();

//   details:any={};

//   constructor(@Inject(MAT_DIALOG_DATA)public dialogData:any,
//   public themeService:ThemeService){}
  

//   ngOnInit(): void {
//     if(this.dialogData){
//       this.details=this.dialogData
//     }
//   }

//   handleChangeAction(){
//     this.onEmitsStatusChange.emit();
//   }


// }
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  
  onEmitsStatusChange = new EventEmitter<boolean>(); // Updated to explicitly emit a boolean

  details: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public themeService: ThemeService
  ) {}
  
  ngOnInit(): void {
    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }

  handleChangeAction(confirm: boolean): void {
    this.onEmitsStatusChange.emit(confirm); // Emitting a boolean value based on user action
  }
}


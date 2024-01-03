// import { Component } from '@angular/core';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { ThemeService } from '../../services/theme.service';
// import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-layout',
//   templateUrl: './layout.component.html',
//   styleUrl: './layout.component.scss'
// })
// export class LayoutComponent {

//   constructor(private dialog:MatDialog,
//     public themeService:ThemeService,
//     private router:Router){}

//     logout(){
//       const dialogConfig=new MatDialogConfig();
//       dialogConfig.data={
//         message:'Logout'
//       };
//       const dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig);
//       const response=dialogRef.componentInstance.onEmitsStatusChange.subscribe((response:any)=>{
//         dialogRef.close();
//         localStorage.removeItem('token');
//         this.router.navigate(['/']);
//       })
//     }
    

//     changeTheme(color:any){
//       this.themeService.setTheme(color);
//     }

// }


import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThemeService } from '../../services/theme.service';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    private dialog: MatDialog,
    public themeService: ThemeService,
    private router: Router
  ) {}

  openLogoutConfirmationDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { message: 'Logout' };

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
    });
  }

  // Rest of your code remains unchanged...
  changeTheme(color:any){
          this.themeService.setTheme(color);
        }
}

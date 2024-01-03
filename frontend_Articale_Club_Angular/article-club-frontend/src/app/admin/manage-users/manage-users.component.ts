// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { MatDialog } from '@angular/material/dialog';
// import { SnackbarService } from '../../services/snackbar.service';
// import { AppUserService } from '../../services/app-user.service';
// import { ThemeService } from '../../services/theme.service';
// import { Router } from '@angular/router';
// import { MatTableDataSource } from '@angular/material/table';
// import { GlobalConstants } from '../../shared/global-constants';


// @Component({
//   selector: 'app-manage-users',
//   templateUrl: './manage-users.component.html',
//   styleUrls:['./manage-users.component.scss']
// })
// export class ManageUsersComponent implements OnInit{
 
//   displayedColumns:string[]=['name','email','status','edit'];
//   dataSource:any;
//   reponseMessage:any;


//   constructor(private ngxService:NgxUiLoaderService,
//     private dialog:MatDialog,
//     private snackbarService:SnackbarService,
//     private router:Router,
//     private appuserService:AppUserService,
//     public themeService:ThemeService){}
    
 
//   ngOnInit(): void {
//     this.ngxService.start();
//     this.tableData();

//   }
//   tableData()
//   {
//     this.appuserService.getAllAppuser().subscribe((response:any)=>{
//       this.ngxService.stop();
//       this.dataSource=new MatTableDataSource(response);
//     },(error:any)=>{
//       this.ngxService.stop();
//       console.log(error);
//       if(error.error?.message){
//         this.reponseMessage=error.error?.message;
//       }
//       else{
//         this.reponseMessage=GlobalConstants.genericError;
//       }
//       this.snackbarService.openSnackBar(this.reponseMessage);
//     })
//   }

//   applyFilter(event:any){
//     const filterValue=(event.target as HTMLInputElement).value;
//     this.dataSource.filter=filterValue.trim().toLowerCase();
//   }

//   handleAddAction(){}

//   handleEditAction(values:any){}

//   onChange(status:any,id:any){
//     this.ngxService.start();
//     var data={
//       id:id,
//       status:status.toString()
//     }
//     this.appuserService.updateUserStatus(data).subscribe((response:any)=>{
//       this.ngxService.stop();
//       this.reponseMessage=response?.message;
//       this.snackbarService.openSnackBar(this.reponseMessage);
//       this.tableData();
//     },(error)=>{
//       this.ngxService.stop();
//       console.log(error);
//       if(error.error?.message){
//         this.reponseMessage=error.error?.message;
//       }
//       else{
//         this.reponseMessage=GlobalConstants.genericError;
//       }
//       this.snackbarService.openSnackBar(this.reponseMessage);

//     })
//   }

// }


import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { AppUserService } from '../../services/app-user.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { UsersComponent } from '../dialog/users/users.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private appuserService: AppUserService,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.appuserService.getAllAppuser().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource<any>(response);
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
    action:'Add'
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef:close();
    });

    const res=dialogRef.componentInstance.onAddUser.subscribe(
      (response)=>{
        this.tableData();
      }
    )
  }

  handleEditAction(values: any) {
  
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
    action:'Edit',
    data:values
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(UsersComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef:close();
    });

    const res=dialogRef.componentInstance.onEditUser.subscribe(
      (response)=>{
        this.tableData();
      }
    )
  }

  onChange(status: any, id: any) {
    this.ngxService.start();
    const data = {
      id: id,
      status: status.toString()
    };
    this.appuserService.updateUserStatus(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage);
        this.tableData();
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage);
      }
    });
  }
}


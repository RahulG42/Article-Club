// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { CategoryService } from '../../services/category.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { SnackbarService } from '../../services/snackbar.service';
// import { ThemeService } from '../../services/theme.service';
// import { Router } from '@angular/router';
// import { MatTableDataSource } from '@angular/material/table';
// import { GlobalConstants } from '../../shared/global-constants';
// import { CategoryComponent } from '../dialog/category/category.component';

// @Component({
//   selector: 'app-manage-category',
//   templateUrl: './manage-category.component.html',
//   styleUrl: './manage-category.component.scss'
// })
// export class ManageCategoryComponent implements OnInit {

//   displayedColumns:string[]=['name','edit'];
//   dataSource:any;
//   reponseMessage:any;


//   constructor(private categoryService:CategoryService,
//     private ngxSerivce:NgxUiLoaderService,
//     private dialog:MatDialog,
//     private snackbarService:SnackbarService,
//     private router:Router,
//     public themeService:ThemeService)
//     {}
//   ngOnInit(): void {
//     this.ngxSerivce.start();
//     this.tableData();
//     }
//     tableData(){
//       this.categoryService.getAllCategory().subscribe((response:any)=>{
//         this.ngxSerivce.stop();
//         this.dataSource=new MatTableDataSource(response);
//       },(error:any)=>{
//         this.ngxSerivce.stop();
//         console.log(error);
//         if(error.error?.message)
//         {
//           this.reponseMessage=error.error?.message;
//         }else{
//           this.reponseMessage=GlobalConstants.genericError;
//         }
//         this.snackbarService.openSnackBar(this.reponseMessage);
//       })
//     }

//     applyFilter(event:Event){
//       const filterValue=(event.target as HTMLInputElement).value;
//       this.dataSource.filter=filterValue.trim().toLowerCase();
//     }

//     handleAddAction()
//     {
//       const dialogConfig=new MatDialogConfig();
//       dialogConfig.data={
//         action:'Add'
//       }
//       dialogConfig.width="850px";
//       const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
//       this.router.events.subscribe(()=>{
//         dialogRef.close();

//       });

//       const res=dialogRef.componentInstance.onAddCategory.subscribe(
//         (response:any)=>{
//           this.tableData();
//         }
//       )

//     }

//     handleEditAction(values:any){}

// }



import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(
    private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.categoryService.getAllCategory().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        this.handleError(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.tableData();
    });
  }

  private handleError(error: any) {
    this.ngxService.stop();
    console.log(error);
    this.responseMessage = error.error?.message || GlobalConstants.genericError;
    this.snackbarService.openSnackBar(this.responseMessage);
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.tableData();
    });
  }
}

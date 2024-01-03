import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ArticleService } from '../../services/article.service';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstants } from '../../shared/global-constants';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { DialogConfig } from '@angular/cdk/dialog';
import { ArticleComponent } from '../dialog/article/article.component';
import { ViewArticleComponent } from '../dialog/view-article/view-article.component';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {

  displayedColumns: string[] = ['title', 'categoryName','status', 'publication_date', 'edit'];
  dataSource: any;
  responseMessage: any;
  // dialog: any;
  // ngxService: any;

  constructor(private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
    public themeService: ThemeService,
    private articleService: ArticleService,) { }
  ngOnInit(): void {
    this.ngxService.start();
  //   this.ngxService.stop();
     this.tableData();
   }
  tableData() {
    this.articleService.getAllArticle().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error:any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      } this.snackbarService.openSnackBar(this.responseMessage)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleAddAction(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(ArticleComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    });
    const res=dialogRef.componentInstance.onAddArticle.subscribe(
      (response:any)=>{
        this.tableData();
      }
    )

  }
  handleViewAction(values: any) {

    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'View',
      data:values
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(ViewArticleComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    });
   }


  handleEditAction(values: any) {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      data:values
    };

    dialogConfig.width="850px";
    const dialogRef=this.dialog.open(ArticleComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const res=dialogRef.componentInstance.onEditArticle.subscribe(
      (response:any)=>{
        this.tableData();
      }
    )
   }


  onDelete(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete' + value.title + 'article'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const res = dialogRef.componentInstance.onEmitsStatusChange.subscribe((response: any) => {
      this.ngxService.start();
      this.deleteProduct(value.id);
      dialogRef.close();
    })
  }
  deleteProduct(id: any) {
    this.articleService.deleteArticle(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response.message
      this.snackbarService.openSnackBar(this.responseMessage);
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage);
      }

    })
  }

}








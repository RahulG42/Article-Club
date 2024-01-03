import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../services/snackbar.service';
import { ThemeService } from '../../../services/theme.service';
import { AppUserService } from '../../../services/app-user.service';
import { GlobalConstants } from '../../../shared/global-constants';
import {  NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  onAddUser=new EventEmitter();
  onEditUser=new EventEmitter();
  usersForm:any=FormGroup;
  dialogAction:any='Add';
  responseMessage:any;
  action!: string;
  

  constructor(@Inject (MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  public dialogRef:MatDialogRef<UsersComponent>,
  private snackbarService:SnackbarService,
  public themeService:ThemeService,
  private appuserService:AppUserService,
  private ngxService:NgxUiLoaderService){}

  ngOnInit(): void {
    this.usersForm=this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      name:[null,[Validators.required]],
      password:[null,[Validators.required]]
    });

    if(this.dialogData.action==='Edit'){
      this.dialogAction='Edit';
      this.action="update";
      this.usersForm.patchValue(this.dialogData.data);
      this.usersForm.controls['password'].setValue('password')
    }
  }


  handleSubmit(){
    if(this.dialogAction=="Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    this.ngxService.start();
    var formData=this.usersForm.value;
    var data={
      email:formData.email,
      name:formData.name,
      password:formData.password
    }
    this.appuserService.addNewAppUser(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.dialogRef.close();
      this.onAddUser.emit();
      this.responseMessage=response.message;
      this.snackbarService.openSnackBar(this.responseMessage);
    },(error)=>{
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage);
    })
  }

  edit() {
    this.ngxService.start();
    var formData = this.usersForm.value;
    var data = {
      email: formData.email,
      name: formData.name,
      id: this.dialogData.data.id
    };
    this.appuserService.updateUser(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage);
    }, (error) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage);
    });
  }
  
}

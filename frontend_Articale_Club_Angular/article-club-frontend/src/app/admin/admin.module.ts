import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { HelpDetailsComponent } from './help-details/help-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { MaterialModule } from '../shared/material-module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './dialog/users/users.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ManageArticleComponent } from './manage-article/manage-article.component';
import { ViewArticleComponent } from './dialog/view-article/view-article.component';
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from '@angular/material/table';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './dialog/article/article.component';


@NgModule({
    declarations: [LayoutComponent,
        HelpDetailsComponent,
        DashboardComponent,
        ConfirmationComponent,
        ManageUsersComponent,
        UsersComponent,
        ManageCategoryComponent,
        CategoryComponent,
        ManageArticleComponent,
        ViewArticleComponent,
        ArticleComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatChipsModule,
        MatTableModule,
        QuillModule.forRoot(),
        SharedModule
    ]
})
export class AdminModule { }

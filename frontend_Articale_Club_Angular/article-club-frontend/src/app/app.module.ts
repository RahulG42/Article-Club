
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { tokenInterceptor } from './services/token.interceptor';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './shared/shared.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';

const ngxUiLoaderConfig:NgxUiLoaderConfig={
    text:"Loading...",
    textColor:"white",
    textPosition:"center-center",
    pbColor:"white",
    bgsColor:"white",
    fgsColor:"white",
    fgsType:SPINNER.squareJellyBox,
    fgsSize:100,
    pbDirection:PB_DIRECTION.leftToRight,
    pbThickness:5
};

@NgModule({
  declarations: [
 
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticleDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    QuillModule.forRoot(),
    SharedModule
  ],
  providers: [HttpClientModule,{provide:HTTP_INTERCEPTORS,useClass:tokenInterceptor,multi:true}],
  bootstrap: [AppComponent] // The root component to bootstrap
})
export class AppModule { }

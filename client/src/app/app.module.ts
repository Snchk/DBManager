import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutsComponent} from './shared/layouts/auth-layouts/auth-layouts.component';
import {SiteLayoutsComponent} from './shared/layouts/site-layouts/site-layouts.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from './shared/services/auth.service'
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import {AuthGuard} from "./shared/classes/auth.guard";
import { LoaderComponent } from './shared/component/loader/loader.component';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutsComponent,
    SiteLayoutsComponent,
    RegisterPageComponent,
    LoaderComponent,
    AddClientComponent,
    ClientDetailComponent,
    ClientListComponent
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService,AuthGuard,
    {
    provide:HTTP_INTERCEPTORS,
    multi:true,
    useClass:TokenInterceptor
    }
],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutsComponent} from "./shared/layouts/auth-layouts/auth-layouts.component";
import {SiteLayoutsComponent} from "./shared/layouts/site-layouts/site-layouts.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {AddClientComponent} from "./add-client/add-client.component";
import {ClientListComponent} from "./client-list/client-list.component";
import {ClientDetailComponent} from "./client-detail/client-detail.component";

const routes: Routes = [
  {path:'',component:AuthLayoutsComponent,children:[
      {path: '',redirectTo:'login',pathMatch:'full'},
      {path:'login',component:LoginPageComponent},
      {path:'register',component:RegisterPageComponent}

    ]},
  {path:'',component:SiteLayoutsComponent,canActivate:[AuthGuard],children:[
      {path: 'edit-client/:id',component: ClientDetailComponent},
      {path: 'client-list',component: ClientListComponent},
      {path: 'add-client',component: AddClientComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

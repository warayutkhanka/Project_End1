import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { HomeUserComponent } from './page/home-user/home-user.component';
import { HomeAdminComponent } from './page/home-admin/home-admin.component';
import { HomeTechnicianComponent } from './page/home-technician/home-technician.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './page/register/register.component';
import { RequestComponent } from './page/request/request.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { EditUserComponent } from './page/edit-user/edit-user.component';
import { EditUsertypeComponent } from './page/edit-usertype/edit-usertype.component';
import { EditEquipmentComponent } from './page/edit-equipment/edit-equipment.component';
import { EditRequestComponent } from './page/edit-request/edit-request.component';
import { UserInfoComponent } from './page/user-info/user-info.component';
import { AssignComponent } from './page/assign/assign.component';
import { ViewAssignComponent } from './page/view-assign/view-assign.component';
import { RepairComponent } from './page/repair/repair.component';
import { EditAssignComponent } from './page/edit-assign/edit-assign.component';
import { EditRepairComponent } from './page/edit-repair/edit-repair.component';
import { EditStatusRepairComponent } from './page/edit-status-repair/edit-status-repair.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ChartModule } from 'angular2-chartjs';
import 'chartjs-plugin-labels';
import { ViewRequestComponent } from './page/view-request/view-request.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUserComponent,
    HomeAdminComponent,
    HomeTechnicianComponent,
    RegisterComponent,
    RequestComponent,
    EditUserComponent,
    EditUsertypeComponent,
    EditEquipmentComponent,
    EditRequestComponent,
    UserInfoComponent,
    AssignComponent,
    ViewAssignComponent,
    RepairComponent,
    EditAssignComponent,
    EditRepairComponent,
    EditStatusRepairComponent,
    DashboardComponent,
    ViewRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlifeFileToBase64Module,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomeUserComponent } from './page/home-user/home-user.component';
import { HomeAdminComponent } from './page/home-admin/home-admin.component';
import { HomeTechnicianComponent } from './page/home-technician/home-technician.component';
import { RegisterComponent } from './page/register/register.component';
import { RequestComponent } from './page/request/request.component';
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
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EditStatusRepairComponent } from './page/edit-status-repair/edit-status-repair.component';
import { ViewRequestComponent } from './page/view-request/view-request.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'HomeUser', component: HomeUserComponent },
  {
    path: 'HomeAdmin', component: HomeAdminComponent,
    children: [
      { path: 'request', component: RequestComponent },
      { path: 'edit-user', component: EditUserComponent },
      { path: 'edit-usertype', component: EditUsertypeComponent },
      { path: 'edit-equipment', component: EditEquipmentComponent },
      { path: 'edit-request', component: EditRequestComponent },
      { path: 'edit-assign', component: EditAssignComponent },
      { path: 'edit-repair', component: EditRepairComponent },
      { path: 'assign', component: AssignComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'edit-status', component: EditStatusRepairComponent }
    ]
  },
  { path: 'HomeTechnician', component: HomeTechnicianComponent },
  { path: 'request', component: RequestComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'view-assign', component: ViewAssignComponent },
  { path: 'repair', component: RepairComponent },
  { path: 'view-request', component: ViewRequestComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

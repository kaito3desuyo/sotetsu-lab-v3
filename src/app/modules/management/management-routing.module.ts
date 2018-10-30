import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './../../pages/management/management.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { ManageVehicleComponent } from 'src/app/pages/management/manage-vehicle/manage-vehicle.component';

const routes: Routes = [
  {
    path: 'Management',
    /*canActivate: [AuthGuard],*/
    children: [
      { path: '', component: ManagementComponent },
      { path: 'vehicle', component: ManageVehicleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}

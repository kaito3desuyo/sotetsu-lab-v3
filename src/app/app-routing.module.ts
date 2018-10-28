import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './pages/top/top.component';
import { TimetableComponent } from './pages/timetable/timetable.component';
import { ManagementComponent } from './pages/management/management.component';

const routes: Routes = [
  { path: '', component: TopComponent },
  { path: 'Timetable', component: TimetableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

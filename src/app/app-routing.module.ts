import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopComponent } from './pages/top/top.component';

const routes: Routes = [
    { path: '', component: TopComponent },
    { path: 'Timetable', component: TopComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

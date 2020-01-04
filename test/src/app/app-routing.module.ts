import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGridComponent } from './components/user-grid/user-grid.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', component: UserAddComponent },
  { path: 'user-add', component: UserAddComponent },
  { path: 'user-grid', component: UserGridComponent, canActivate: [AuthGuardService] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

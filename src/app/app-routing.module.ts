import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillainDetailComponent } from './components/villain-detail/villain-detail.component';
import { DashboardComponent }   from './components/dashboard/dashboard.component';
import { HeroesComponent }      from './components/heroes/heroes.component';
import { HeroDetailComponent }  from './components/hero-detail/hero-detail.component';
import { VillainsComponent } from './components/villains/villains.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'villainDetail/:id', component: VillainDetailComponent },
  { path: 'villains', component: VillainsComponent } ]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

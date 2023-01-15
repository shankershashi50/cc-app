import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StocksCardComponent } from './stocks-card/stocks-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'real-stocks', pathMatch: 'full' },
  { path: 'real-stocks', component: StocksCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

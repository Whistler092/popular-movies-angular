import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostpopularComponent } from './mostpopular/mostpopular.component';
import { MovieComponent } from './movie/movie.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MostpopularComponent
  },
  {
    path: 'mostpopular',
    component: MostpopularComponent
  },
  {
    path: 'movie/:id',
    component: MovieComponent
  },
  {
    path:'',
    redirectTo: 'mostpopular',
    pathMatch: 'full'
  }
];

export const routedComponents = [
  MostpopularComponent,
  MovieComponent
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




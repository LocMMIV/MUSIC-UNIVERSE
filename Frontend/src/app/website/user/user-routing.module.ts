import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { UnichartComponent } from './unichart/unichart.component';
import { TypeComponent } from './type/type.component';
import { ListSongComponent } from './list-song/list-song.component';
import { FavoriteSongComponent } from './favorite-song/favorite-song.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'unichart', component: UnichartComponent },
      { path: 'category', component: TypeComponent },
      { path: 'list-song', component: ListSongComponent },
      { path: 'favorite-song', component: FavoriteSongComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

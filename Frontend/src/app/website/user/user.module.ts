import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MusicbarComponent } from './components/musicbar/musicbar.component';
import { HomeComponent } from './home/home.component';
import { UnichartComponent } from './unichart/unichart.component';
import { MusicsidebarComponent } from './components/musicsidebar/musicsidebar.component';
import { ListSongComponent } from './list-song/list-song.component';
import { FavoriteSongComponent } from './favorite-song/favorite-song.component';

@NgModule({
  declarations: [
    UserComponent,
    SidebarComponent,
    NavbarComponent,
    MusicbarComponent,
    HomeComponent,
    UnichartComponent,
    MusicsidebarComponent,
    ListSongComponent,
    FavoriteSongComponent,
  ],
  imports: [CommonModule, UserRoutingModule, FormsModule],
})
export class UserModule {}

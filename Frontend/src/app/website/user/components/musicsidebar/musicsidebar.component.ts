import { Component } from '@angular/core';

@Component({
  selector: 'app-musicsidebar',
  templateUrl: './musicsidebar.component.html',
  styleUrls: ['./musicsidebar.component.css']
})
export class MusicsidebarComponent {
  activeButton: string = 'playlist'; // Mặc định chọn 'Danh sách phát'

  setActive(button: string) {
    this.activeButton = button;
  }
}

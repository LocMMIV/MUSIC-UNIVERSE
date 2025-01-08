import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  dropdownOpen = false;
  dropdownActive = false; // Biến theo dõi trạng thái active của phần menu chứa dropdown

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectMenu(menu: string) {
    if (menu === 'dropdown') {
      this.dropdownActive = true; // Giữ active cho menu chứa dropdown khi chọn menu trong dropdown
    } else {
      this.dropdownActive = false; // Bỏ active khi chọn menu ngoài dropdown
      this.dropdownOpen = false;   // Đóng menu dropdown khi chọn menu ngoài dropdown
    }
  }
}



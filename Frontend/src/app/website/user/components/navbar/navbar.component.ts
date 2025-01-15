import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false; // Trạng thái mở/đóng menu
  isClicked = false;

  // Toggle trạng thái menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleClick() {
    this.isClicked = !this.isClicked;
  }

  isBackDisabled: boolean = false;  // Trạng thái nút lùi
  isForwardDisabled: boolean = false; // Trạng thái nút tiến

  // Kiểm tra và thực hiện lùi trang
  goBack(): void {
    if (!this.isBackDisabled) {
      window.history.back();  // Lùi trang
      this.updateButtonState();  // Cập nhật trạng thái của các nút
    }
  }

  // Kiểm tra và thực hiện tiến trang
  goForward(): void {
    if (!this.isForwardDisabled) {
      window.history.forward();  // Tiến trang
      this.updateButtonState();  // Cập nhật trạng thái của các nút
    }
  }

  // Cập nhật trạng thái của các nút
  updateButtonState(): void {
    this.isBackDisabled = !window.history.length || window.history.state === null;
    this.isForwardDisabled = window.history.length === 0;
  }
}

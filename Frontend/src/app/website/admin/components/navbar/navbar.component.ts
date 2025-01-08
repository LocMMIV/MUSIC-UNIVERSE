import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isDropdownOpen = false; // Trạng thái mở/đóng menu
  isClicked = false;
  isActive = false;

  // Khi người dùng click vào thanh tìm kiếm, thêm lớp active
  onFocus() {
    this.isActive = true;
  }

  // Khi người dùng thoát khỏi thanh tìm kiếm (blur), xóa lớp active
  onBlur() {
    this.isActive = false;
  }

  // Dừng sự kiện click lan ra ngoài
  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  // Lắng nghe sự kiện click trên document để đóng lớp active khi click ra ngoài
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer && !searchContainer.contains(event.target as Node)) {
      this.isActive = false;
    }
  }

  // Toggle trạng thái menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleClick() {
    this.isClicked = !this.isClicked;
  }


}

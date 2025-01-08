import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-account-access',
  templateUrl: './account-access.component.html',
  styleUrls: ['./account-access.component.css']
})
export class AccountAccessComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';
  cccd: string = '';

  constructor(private notificationService: NotificationService) {}


  login() {
    if (!this.email || !this.password) {
      this.notificationService.showMessage('Vui lòng nhập đủ thông tin', 'error');
      return;
    }

    // Kiểm tra thông tin đăng nhập
    console.log('Đăng nhập với email:', this.email);
    console.log('Mật khẩu:', this.password);
    // Hiển thị thông báo thành công
    this.notificationService.showMessage('Đăng nhập thành công!', 'success');
  }

  // Hàm xử lý khi đăng ký
  register() {
    if (!this.name || !this.cccd || !this.email || !this.password || !this.confirmPassword) {
      this.notificationService.showMessage('Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.notificationService.showMessage('Mật khẩu không khớp!', 'error');
      return;
    }

    // Kiểm tra thông tin đăng ký
    console.log('Đăng ký với thông tin:', this.name, this.cccd, this.email, this.password);
    // Hiển thị thông báo thành công
    this.notificationService.showMessage('Đăng ký thành công!', 'success');
  }

  @ViewChild('container')
    container!: ElementRef;
  
    ngAfterViewInit(): void {
      console.log(this.container);
    }
  
    onSignUpClick(): void {
      this.container.nativeElement.classList.add('right-panel-active');
    }
  
    onSignInClick(): void {
      this.container.nativeElement.classList.remove('right-panel-active');
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  data = [
    { id: '12', fullName: 'Nguyễn Văn A', userName: 'nguyenvana', email: 'a@example.com', status: '' },
    { id: '987', fullName: 'Trần Thị B', userName: 'tranthib', email: 'b@example.com', status: '' },
  ];

  filteredData: any[] = [];
  currentPage = 1;
  paginatedData: any[] = [];

  // Hàm thay đổi trạng thái khóa
  toggleLockStatus(row: any): void {
    if (row.status === 'Giải quyết') {
      row.status = '';
    } else {
      row.status = 'Giải quyết';
      this.notificationService.showMessage('Giải quyết thành công!', 'success');
    }
  }

  // Biến điều khiển việc hiển thị hộp thoại xác nhận
  isConfirmDialogVisible: boolean = false;

  // Hiển thị hộp thoại xác nhận khi nhấn nút "Xóa"
  showConfirmDialog(): void {
    this.isConfirmDialogVisible = true;
  }

  // Xử lý khi nhấn nút "Xác nhận"
  deleteItem(): void {
    // Thực hiện hành động xóa tại đây (ví dụ: xóa dữ liệu hoặc gọi API)
    console.log('Đã xóa');
    this.notificationService.showMessage('Đã xóa thành công!', 'success');

    // Ẩn hộp thoại sau khi xác nhận
    this.isConfirmDialogVisible = false;
  }

  // Xử lý khi nhấn nút "Hủy"
  cancelDelete(): void {
    // Ẩn hộp thoại khi người dùng chọn hủy
    this.isConfirmDialogVisible = false;
  }

  constructor(
    private paginationService: PaginationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.updateTable();
  }

  updateTable(): void {
    this.paginatedData = this.paginationService.paginate(this.filteredData, this.currentPage);
  }

  get visiblePages(): (number | string)[] {
    return this.paginationService.getVisiblePages(this.currentPage, this.totalPages);
  }

  changePage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTable();
    }
  }

  filterBooks(): void {
    this.currentPage = 1;
    this.updateTable();
  }

  get totalPages(): number {
    return this.paginationService.totalPages(this.filteredData);
  }

  navigateToDetailContact(): void {
    this.router.navigate(['/detail-contact']);
  }
}

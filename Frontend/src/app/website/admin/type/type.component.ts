import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  data = [
    { id: 1, typeName: 'Thể loại 1' },
    { id: 2, typeName: 'Thể loại 2' },
    { id: 3, typeName: 'Thể loại 3' },
  ];
  
  isAddTypeFormVisible: boolean = false;
  newType: { typeName: string } = { typeName: '' };
  
  // Kiểm tra trùng lặp
  isDuplicateTypeName: boolean = false;
  
  // Hàm kiểm tra tên chủ đề & thể loại có trùng không
  checkTypeNameDuplicate(typeName: string): void {
    this.isDuplicateTypeName = this.data.some(type => type.typeName.toLowerCase() === typeName.toLowerCase());
  }
  
  // Toggle form thêm chủ đề & thể loại
  toggleAddTypeForm(): void {
    this.isAddTypeFormVisible = !this.isAddTypeFormVisible;
    if (!this.isAddTypeFormVisible) {
      this.newType = {
        typeName: '',
      };
    }
  }
  
  // Xử lý khi gửi form
  submitAddTypeForm(): void {
    const { typeName } = this.newType;

    // Kiểm tra dữ liệu đầu vào
    if (this.isDuplicateTypeName) {
      return;
    } else if (!typeName.trim()) {
      return;
    } else {
      // Thêm chủ đề & thể loại vào danh sách
      this.data.push({
        id: Date.now(),
        typeName: typeName
    });

    this.notificationService.showMessage('Thêm chủ đề & thể loại thành công!', 'success');

    this.newType = { typeName: '' };
    this.toggleAddTypeForm();
  }
}
  

  filteredData: any[] = []; 
  currentPage = 1;
  paginatedData: any[] = []; 

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
    private notificationService: NotificationService
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
}

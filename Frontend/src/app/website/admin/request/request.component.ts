import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  data = [
    { id: '12', fullName: 'Nguyễn Văn A', userName: 'nguyenvana', email: 'a@example.com' },
    { id: '987', fullName: 'Trần Thị B', userName: 'tranthib', email: 'b@example.com', },
  ];

  

  filteredData: any[] = [];
  currentPage = 1;
  paginatedData: any[] = [];

  constructor(
    private paginationService: PaginationService
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

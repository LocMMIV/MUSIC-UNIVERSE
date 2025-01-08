import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationService } from '../../../services/pagination.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  data = [
    {
      id: 1,
      title: "Bài hát 1",
      image: "assets/images/moloichoem.jpg", // Thay thế bằng URL ảnh thật
      preview: "assets/audio/moloichoem.mp3", // Thay thế bằng đường dẫn thật tới tệp audio
      artist: "Nghệ sĩ 1",
    },
    {
      id: 1,
      title: "Bài hát 1",
      image: "moloichoem.jpg", // Thay thế bằng URL ảnh thật
      preview: "assets/audio/tuminhsuydien.mp3", // Thay thế bằng đường dẫn thật tới tệp audio
      artist: "Nghệ sĩ 1",
    }, 
  ]
  
  isAddSongFormVisible: boolean = false; // Điều khiển việc hiển thị bảng thêm bài hát
  newSong: { 
    name: string; 
    artist: string; 
    src: string; 
    image: string; 
    types: string[]; 
    lyrics: string; 
  } = { name: '', artist: '', src: '', image: '', types: [], lyrics: '' }; // Dữ liệu bài hát mới

  // Dữ liệu các thể loại chủ đề
  types: string[] = ['Pop', 'Rock', 'Jazz', 'Hip Hop', 'Classical', 'R&B', 'EDM'];
  

  // Toggle bảng thêm bài hát
  toggleAddSongForm(): void {
    this.isAddSongFormVisible = !this.isAddSongFormVisible;
  }

  // Xử lý khi gửi form
  submitAddSongForm(): void {
    if (this.newSong.name && this.newSong.artist && this.newSong.src) {
      console.log('Bài hát mới:', this.newSong);
      // Thêm bài hát mới vào dữ liệu hoặc gửi tới backend
      // Reset form
      this.newSong = { name: '', artist: '', src: '', image: '', types: [], lyrics: '' };
      this.toggleAddSongForm(); // Đóng bảng sau khi thêm bài hát
    } else {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc: Tên bài hát và Âm thanh!');
    }
  }

  // Xử lý khi người dùng thay đổi hình ảnh
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newSong.image = file.name; // Lưu tên tệp hình ảnh
    }
  }

  // Xử lý khi người dùng thay đổi âm thanh
  onAudioChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newSong.src = file.name; // Lưu tên tệp âm thanh
    }
  }

  


  filteredData: any[] = []; // Dữ liệu đã lọc
  currentPage = 1;
  paginatedData: any[] = [];
  private currentlyPlayingAudio: HTMLAudioElement | null = null; // Lưu trữ bài đang phát

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
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.filteredData = [...this.data]; // Gán dữ liệu ban đầu vào filteredData
    this.updateTable();
  }

  updateTable(): void {
    // Phân trang dựa trên filteredData thay vì data
    this.paginatedData = this.paginationService.paginate(this.filteredData, this.currentPage);
  }

  playAudio(audioElement: HTMLAudioElement): void {
    if (this.currentlyPlayingAudio && this.currentlyPlayingAudio !== audioElement) {
      this.currentlyPlayingAudio.pause(); // Dừng bài đang phát
      this.currentlyPlayingAudio.currentTime = 0; // Đưa về thời gian ban đầu
    }
    this.currentlyPlayingAudio = audioElement; // Cập nhật bài đang phát
  }

  pauseAudio(audioElement: HTMLAudioElement): void {
    if (this.currentlyPlayingAudio === audioElement) {
      this.currentlyPlayingAudio = null; // Xóa bài đang phát khi tạm dừng
    }
  }


  get visiblePages(): (number | string)[] {
    // Lấy danh sách các trang hiển thị
    return this.paginationService.getVisiblePages(this.currentPage, this.totalPages);
  }

  changePage(page: number | string): void {
    //Nếu trang quá nhiều thì sẽ hiện "..."
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateTable();
    }
  }
  filterBooks(): void {
    this.currentPage = 1; // Reset về trang đầu
    this.updateTable();
  }

  get totalPages(): number {
    // Tính tổng số trang dựa trên filteredData
    return this.paginationService.totalPages(this.filteredData);
  }

  navigateToDetailSong(): void {
    this.router.navigate(['/detail-song']);
  }
}

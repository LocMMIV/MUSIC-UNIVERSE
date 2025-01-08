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
      songName: "Mở Lối Cho Em",
      image: "assets/images/moloichoem.jpg",
      preview: "assets/audio/moloichoem.mp3",
      artist: "Lương Quý Tuấn, Hữu Công",
      genre: "Nhạc trẻ"
    },
    {
      id: 1,
      songName: "Nỗi Nhớ Vô Hạn",
      image: "assets/images/noinhovohan.jpg",
      preview: "assets/audio/noinhovohan.mp3",
      artist: "Thanh Hưng",
      genre: "Nhạc trẻ"
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

  options = [
    { value: 'pop', text: 'Pop' },
    { value: 'rock', text: 'Rock' },
    { value: 'jazz', text: 'Jazz' },
    { value: 'classical', text: 'Classical' },
    { value: 'hiphop', text: 'Hip-Hop' }
  ]; // Danh sách các thể loại

  selectedItems: { value: string; text: string }[] = []; // Các mục đã chọn

  // Hàm xử lý khi chọn thể loại
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue) {
      const selectedOption = this.options.find(option => option.value === selectedValue);
      if (selectedOption && !this.selectedItems.some(item => item.value === selectedValue)) {
        this.selectedItems.push(selectedOption); // Thêm mục mới vào danh sách
      }
      selectElement.value = ''; // Reset lại select sau khi chọn
    }
  }

  // Hàm xử lý khi xóa một thể loại
  removeItem(item: { value: string; text: string }): void {
    this.selectedItems = this.selectedItems.filter(selected => selected.value !== item.value);
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

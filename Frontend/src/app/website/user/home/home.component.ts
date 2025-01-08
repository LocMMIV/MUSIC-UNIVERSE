import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  suggestSongs = [
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
  ];

  newSongs = [
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
    { image: '../../../../assets/images/moloichoem.jpg', title: 'Mở Lối Cho Em', artist: 'Nghệ sĩ', isLiked: false },
  ];

  suggestRows: any[] = [];
  newRows: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.suggestRows = this.chunkArray(this.suggestSongs, 3);
    this.newRows = this.chunkArray(this.newSongs, 3);
  }

  // Hàm chia mảng thành các nhóm
  chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  toggleLike(index: number) {
    const song = this.suggestSongs[index];

    if (song.isLiked) {
      // Bài hát đã được yêu thích, bỏ thích
      song.isLiked = false;
      this.notificationService.showMessage(`${song.title} đã xóa khỏi danh sách yêu thích`, 'success');
    } else {
      // Bài hát chưa được yêu thích, thêm vào danh sách yêu thích
      song.isLiked = true;
      this.notificationService.showMessage(`${song.title} đã thêm vào danh sách yêu thích`, 'success');
    }
  }
}

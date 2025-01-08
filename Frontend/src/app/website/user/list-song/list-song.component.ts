import { Component } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrl: './list-song.component.css'
})
export class ListSongComponent {
  songs = [
    {
      songName: 'Mở lối cho em',
      artist: 'Thanh Hưng',
      duration: '05:19',
      image: 'assets/images/moloichoem.jpg',
      isLiked: false // Thêm thuộc tính isLiked vào mỗi bài hát
    },
    {
      songName: 'Tình Anh',
      artist: 'Đình Dũng, ACV',
      duration: '04:52',
      image: 'path-to-image2.jpg',
      isLiked: false // Thêm thuộc tính isLiked vào mỗi bài hát
    },
    // Thêm các bài hát khác tại đây
  ];

  likedSongs: any[] = []; // Mảng để lưu danh sách bài hát yêu thích

  constructor(private notificationService: NotificationService) { }

  toggleLike(index: number) {
    const song = this.songs[index];
  
    if (song.isLiked) {
      // Bài hát đã được yêu thích, bỏ thích
      this.likedSongs = this.likedSongs.filter((likedSong) => likedSong !== song);
      this.notificationService.showMessage(`${song.songName} đã xóa khỏi danh sách yêu thích`, 'success');
    } else {
      // Bài hát chưa được yêu thích, thêm vào danh sách yêu thích
      this.likedSongs.push(song);
      this.notificationService.showMessage(`${song.songName} đã thêm vào danh sách yêu thích`, 'success');
    }
  
    // Thay đổi trạng thái yêu thích của bài hát sau khi thông báo
    song.isLiked = !song.isLiked;
  }
  
}
